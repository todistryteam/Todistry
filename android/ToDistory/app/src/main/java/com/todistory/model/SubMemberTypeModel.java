package com.todistory.model;

public class SubMemberTypeModel {
    private String value;
    private String label;

    public SubMemberTypeModel(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public String getLabel() {
        return label;
    }

    @Override
    public String toString() {
        return label;
    }
}
