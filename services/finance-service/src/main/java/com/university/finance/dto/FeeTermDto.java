package com.university.finance.dto;

import lombok.Data;
import java.util.List;
import com.university.finance.model.FeeTermType;
import com.university.finance.model.FeeTerm;

@Data
public class FeeTermDto {
    private String id;
    private String name;
    private boolean active;
    private String companyId;
    private FeeTermType type;
    private List<FeeTermLineDto> paymentLines;

    public static FeeTermDto fromEntity(FeeTerm feeTerm) {
        FeeTermDto dto = new FeeTermDto();
        dto.setId(feeTerm.getId().toString());
        dto.setName(feeTerm.getName());
        dto.setActive(feeTerm.isActive());
        dto.setCompanyId(feeTerm.getCompanyId());
        dto.setType(feeTerm.getType());
        // Lines mapping would be done in Service to handle lazy loading cleanly or here
        // if eager
        return dto;
    }
}
