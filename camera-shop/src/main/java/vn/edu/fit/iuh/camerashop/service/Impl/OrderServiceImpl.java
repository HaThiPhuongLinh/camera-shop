package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.entity.*;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.OrderDetailRepository;
import vn.edu.fit.iuh.camerashop.repository.OrderRepository;
import vn.edu.fit.iuh.camerashop.service.IItemStatusService;
import vn.edu.fit.iuh.camerashop.service.IOrderService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    private final UserServiceImpl userService;
    private final OrderDetailRepository orderDetailRepository;
    private final VariantServiceImpl variantService;
    private final IItemStatusService itemStatusService;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Override
    public Order createOrder(OrderRequest orderRequest) {
        User user = userService.getUserById(orderRequest.getUserId());

        Order order = Order.builder()
                .id(generateOrderId())
                .user(user)
                .quantity(orderRequest.getQuantity())
                .total(orderRequest.getTotal())
                .createAt(LocalDateTime.now())
                .build();

        Order savedOrder = orderRepository.save(order);

        List<OrderDetail> orderDetails = orderRequest.getOrderDetails().stream()
                .map(orderDetail -> {
                    Variant variant = variantService.getVariantById((int) orderDetail.getVariantId());

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

        return savedOrder;
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
