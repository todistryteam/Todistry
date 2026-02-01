package com.todistory.model;

public class VideoChatUserModel {

    String id;
    String userName;
    boolean isSelected;

    public VideoChatUserModel(String id, String userName, boolean isSelected) {
        this.id = id;
        this.userName = userName;
        this.isSelected = isSelected;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }
}
