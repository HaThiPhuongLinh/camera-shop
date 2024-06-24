package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.entity.*;
import vn.edu.fit.iuh.camerashop.repository.OrderDetailRepository;
import vn.edu.fit.iuh.camerashop.repository.OrderRepository;
import vn.edu.fit.iuh.camerashop.service.IOrderService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private VariantServiceImpl variantService;

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

        List<OrderDetail> orderDetails = orderRequest.getOrderDetails().stream()
                .map(orderDetail -> {
                    Variant variant = variantService.getVariantById((int) orderDetail.getVariantId());

                    return OrderDetail.builder()
                            .orderDetail_pk(OrderDetail_PK.builder()
                                    .order(order.getId())
                                    .variant(orderDetail.getVariantId())
                                    .build())
                            .order(order)
                            .variant(variant)
                            .quantity(orderDetail.getQuantity())
                            .discount(orderDetail.getDiscount())
                            .price(orderDetail.getPrice())
                            .build();
                }).toList();

        orderDetailRepository.saveAll(orderDetails);

        return orderRepository.save(order);
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
