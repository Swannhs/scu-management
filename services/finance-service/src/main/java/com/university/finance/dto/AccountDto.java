package com.university.finance.dto;

import com.university.finance.model.AccountType;
import lombok.Data;
import java.util.UUID;

@Data
public class AccountDto {
    private UUID id;
    private String code;
    private String name;
    private AccountType type;
    private UUID parentId;
    private boolean isPosting;
    private boolean isActive = true;
}
