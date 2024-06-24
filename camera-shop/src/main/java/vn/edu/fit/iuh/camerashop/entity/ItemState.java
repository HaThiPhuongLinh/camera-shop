package vn.edu.fit.iuh.camerashop.entity;

import lombok.*;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.time.LocalDateTime;

@Data
@Builder
public class ItemState {
    private Status status;
    private LocalDateTime time;
}
