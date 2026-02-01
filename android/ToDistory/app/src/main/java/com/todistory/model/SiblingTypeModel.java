package com.todistory.model;

public class SiblingTypeModel {

    private String value;
    private String label;

    public SiblingTypeModel(String value, String label) {
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
