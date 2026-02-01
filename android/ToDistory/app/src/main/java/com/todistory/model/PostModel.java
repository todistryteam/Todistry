package com.todistory.model;

public class PostModel {
    private String id;
    private String userName;
    private String profileImage;
    private String postTitle;
    private String postMessage;
    private String media;
    private String mediaType;

    public PostModel(String id, String userName, String profileImage, String postTitle, String postMessage, String media, String mediaType) {
        this.id = id;
        this.userName = userName;
        this.profileImage = profileImage;
        this.postTitle = postTitle;
        this.postMessage = postMessage;
        this.media = media;
        this.mediaType = mediaType;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    public String getPostTitle() { return postTitle; }
    public void setPostTitle(String postTitle) { this.postTitle = postTitle; }
    public String getPostMessage() { return postMessage; }
    public void setPostMessage(String postMessage) { this.postMessage = postMessage; }
    public String getMedia() { return media; }
    public void setMedia(String media) { this.media = media; }

    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }
}