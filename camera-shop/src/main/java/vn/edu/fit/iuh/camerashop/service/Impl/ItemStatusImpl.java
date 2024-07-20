package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.response.ItemStatusResponse;
import vn.edu.fit.iuh.camerashop.entity.ItemState;
import vn.edu.fit.iuh.camerashop.entity.ItemStatus;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;
import vn.edu.fit.iuh.camerashop.exception.BadRequestException;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.ItemStatusRepository;
import vn.edu.fit.iuh.camerashop.service.IItemStatusService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemStatusImpl implements IItemStatusService {
    @Autowired
    private ItemStatusRepository itemStatusRepository;

    @Override
    public boolean existsByOrderIdAndStatus(String orderId, Status status) {
        return itemStatusRepository.existsByOrderIdAndStatus(orderId, status);
    }

    @Override
    public boolean existsByOrderId(String orderId) {
        return itemStatusRepository.existsByOrderId(orderId);
    }

    @Override
    public ItemStatus add(ItemStatus itemStatus) {
        if (itemStatus == null)
            throw new BadRequestException("Info is required");

        return itemStatusRepository.save(itemStatus);
    }

    @Override
    public ItemStatusResponse getByOrderId(String orderId) {
        List<ItemStatus> itemStatusList = itemStatusRepository.findByOrderId(orderId);

        if (itemStatusList.isEmpty()) {
            throw new NotFoundException("OrderID not found");
        }

        List<ItemState> itemStateList = itemStatusList.stream()
                .map(itemStatus -> ItemState.builder()
                        .status(itemStatus.getStatus())
                        .time(itemStatus.getTime())
                        .build())
                .toList();

        return ItemStatusResponse.builder()
                .order(itemStatusList.get(0).getOrder())
                .state(itemStateList)
                .build();
    }
}
