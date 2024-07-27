package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.SalesReport;
import vn.edu.fit.iuh.camerashop.dto.request.OrderDetailRequest;
import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.dto.response.ItemStatusResponse;
import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.dto.response.RecentOrderResponse;
import vn.edu.fit.iuh.camerashop.entity.*;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;
import vn.edu.fit.iuh.camerashop.exception.BadRequestException;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.ItemStatusRepository;
import vn.edu.fit.iuh.camerashop.repository.OrderDetailRepository;
import vn.edu.fit.iuh.camerashop.repository.OrderRepository;
import vn.edu.fit.iuh.camerashop.repository.UserRepository;
import vn.edu.fit.iuh.camerashop.service.IItemStatusService;
import vn.edu.fit.iuh.camerashop.service.IOrderService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    private final UserServiceImpl userService;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final VariantServiceImpl variantService;
    private final IItemStatusService itemStatusService;
    private final CartItemServiceImpl cartItemService;
    private final CartServiceImpl cartService;
    private final EmailServiceImpl emailService;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Value("${warehouse.storage.cost}")
    private double warehouseStorageCost;

    @Value("${management.cost}")
    private double managementCost;

    @Value("${profit.margin}")
    private double profitMargin;


    @Override
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return getOrderResponses(orders);
    }

    private List<OrderResponse> getOrderResponses(List<Order> orders) {
        return orders.stream().map(order -> {
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(order.getId());
            return OrderResponse.builder()
                    .id(order.getId())
                    .userId(order.getUser().getId())
                    .quantity(order.getQuantity())
                    .total(order.getTotal())
                    .createAt(order.getCreateAt())
                    .orderDetails(orderDetails)
                    .shipAddress(order.getShipAddress())
                    .customerName(order.getCustomerName())
                    .customerPhone(order.getCustomerPhone())
                    .build();
        }).collect(Collectors.toList());
    }


    @Override
    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order not found"));
    }

    @Override
    public OrderResponse getOrderDTOById(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order not found"));
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .quantity(order.getQuantity())
                .total(order.getTotal())
                .createAt(order.getCreateAt())
                .orderDetails(orderDetailRepository.findByOrderId(orderId))
                .shipAddress(order.getShipAddress())
                .customerName(order.getCustomerName())
                .customerPhone(order.getCustomerPhone())
                .build();
    }

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        User user = userService.getUserById(orderRequest.getUserId());

        List<String> outOfStockMessages = new ArrayList<>();

        for (OrderDetailRequest orderDetail : orderRequest.getOrderDetails()) {
            Variant variant = variantService.getVariantById((int) orderDetail.getVariantId());
            if (variant.getQuantity() < orderDetail.getQuantity()) {
                outOfStockMessages.add(variant.getCamera().getName() + ", " + variant.getColor() + " with " + variant.getStyle());
            }
        }

        if (!outOfStockMessages.isEmpty()) {
            throw new BadRequestException("Items " + String.join(" and ", outOfStockMessages) + " are out of stock.");
        }

        Order order = Order.builder()
                .id(generateOrderId())
                .user(user)
                .quantity(orderRequest.getQuantity())
                .total(orderRequest.getTotal())
                .createAt(LocalDateTime.now())
                .shipAddress(orderRequest.getShipAddress())
                .customerName(orderRequest.getCustomerName())
                .customerPhone(orderRequest.getCustomerPhone())
                .build();

        Order savedOrder = orderRepository.save(order);

        List<OrderDetail> orderDetails = orderRequest.getOrderDetails().stream()
                .map(orderDetail -> {
                    Variant variant = variantService.getVariantById((int) orderDetail.getVariantId());
                    variant.setQuantity(variant.getQuantity() - orderDetail.getQuantity());
                    variantService.updateVariantQuantity(variant.getId(), -orderDetail.getQuantity());

                    cartItemService.deleteCartItem(cartService.getCartByUserId(user.getId()).getId(), variant.getId());

                    return OrderDetail.builder()
                            .orderDetail_pk(OrderDetail_PK.builder()
                                    .order(savedOrder.getId())
                                    .variant(orderDetail.getVariantId())
                                    .build())
                            .order(savedOrder)
                            .variant(variant)
                            .quantity(orderDetail.getQuantity())
                            .discount(orderDetail.getDiscount())
                            .price(orderDetail.getPrice())
                            .build();
                }).toList();

        itemStatusService.add(ItemStatus.builder()
                .order(savedOrder)
                .status(Status.PENDING)
                .time(LocalDateTime.now())
                .build());

        orderDetailRepository.saveAll(orderDetails);

        OrderResponse orderResponse = OrderResponse.builder()
                .id(savedOrder.getId())
                .userId(savedOrder.getUser().getId())
                .quantity(savedOrder.getQuantity())
                .total(savedOrder.getTotal())
                .createAt(savedOrder.getCreateAt())
                .orderDetails(orderDetails)
                .shipAddress(savedOrder.getShipAddress())
                .customerName(savedOrder.getCustomerName())
                .customerPhone(savedOrder.getCustomerPhone())
                .build();

        emailService.sendOrderConfirmationEmail(user.getEmail(), orderResponse);

        return orderResponse;
    }

    @Override
    public List<OrderResponse> getAllOrdersByUserId(long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return getOrderResponses(orders);
    }

    @Override
    public SalesReport calculateSalesReport(LocalDate startMonth, LocalDate endMonth) {
        LocalDateTime start = startMonth.atStartOfDay();
        LocalDateTime end = endMonth.plusMonths(1).atStartOfDay();
        
        List<Order> deliveredOrders = orderRepository.findOrdersByStatusAndTimeBetween(Status.DELIVERED, start, end);

        double totalSales = deliveredOrders.stream().mapToDouble(Order::getTotal).sum();
        
        double totalExpenses = totalSales * (warehouseStorageCost + managementCost);
        
        double profit = (totalSales - totalExpenses) * profitMargin;
        
        long totalCustomers = userRepository.countDistinctUsers(start, end);
        
        return new SalesReport(totalSales, totalExpenses, profit, totalCustomers);
    }

    @Override
    public List<SalesReport> calculateMonthlySalesReports(LocalDate startMonth, LocalDate endMonth) {
        List<SalesReport> monthlyReports = new ArrayList<>();

        LocalDate currentMonth = startMonth;
        while (!currentMonth.isAfter(endMonth)) {
            LocalDateTime start = currentMonth.atStartOfDay();
            LocalDateTime end = currentMonth.plusMonths(1).atStartOfDay();

            List<Order> deliveredOrders = orderRepository.findOrdersByStatusAndTimeBetween(Status.DELIVERED, start, end);

            double totalSales = deliveredOrders.stream().mapToDouble(Order::getTotal).sum();

            double totalExpenses = totalSales * (warehouseStorageCost + managementCost);

            double profit = (totalSales - totalExpenses) * profitMargin;

            long totalCustomers = userRepository.countDistinctUsers(start, end);

            monthlyReports.add(new SalesReport(totalSales, totalExpenses, profit, totalCustomers));

            currentMonth = currentMonth.plusMonths(1);
        }

        return monthlyReports;
    }

    @Override
    public List<RecentOrderResponse> getRecentOrders(int limit) {
        List<Order> recentOrders = orderRepository.findTop6ByOrderByCreateAtDesc();

        return recentOrders.stream()
                .map(order -> {
                    ItemStatusResponse itemStatusResponse = itemStatusService.getByOrderId(order.getId());
                    ItemState latestStatus = itemStatusResponse.getState().stream()
                            .max(Comparator.comparing(ItemState::getTime))
                            .orElse(null);

                    return RecentOrderResponse.builder()
                            .orderId(order.getId())
                            .orderDate(order.getCreateAt())
                            .total(order.getTotal())
                            .shippingAddress(order.getShipAddress())
                            .status(latestStatus != null ? latestStatus.getStatus() : null)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public void cancelOrder(String orderId) {
        ItemStatusResponse itemStatuses = itemStatusService.getByOrderId(orderId);

        if (itemStatuses.getState().stream().noneMatch(status -> status.getStatus() == Status.PENDING)) {
            throw new BadRequestException("Order can only be canceled if it is in PENDING status.");
        }

        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);

        orderDetails.forEach(orderDetail -> {
            Variant variant = orderDetail.getVariant();
            variant.setQuantity(variant.getQuantity() + orderDetail.getQuantity());
            variantService.updateVariantQuantity(variant.getId(), orderDetail.getQuantity());
        });

        updateOrderStatus(orderId, Status.CANCEL);
    }


    @Override
    public void updateOrderStatus(String orderId, Status newStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new NotFoundException("Order not found"));

        ItemStatus itemStatus = ItemStatus.builder()
                .order(order)
                .status(newStatus)
                .time(LocalDateTime.now())
                .build();

        itemStatusService.add(itemStatus);
    }

    public static String generateOrderId() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
}
