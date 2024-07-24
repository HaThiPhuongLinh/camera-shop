package vn.edu.fit.iuh.camerashop.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalesReport {
    private double totalSales;
    private double totalExpenses;
    private double profit;
    private long totalCustomers;
}
