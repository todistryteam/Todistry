package com.todistory.model;

public class RelationWithAdminModel {

    private String value;
    private String label;

    public RelationWithAdminModel(String value, String label) {
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
