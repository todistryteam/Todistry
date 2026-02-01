package com.todistory.ui.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;
import com.todistory.R;
import com.todistory.model.PostModel;

import java.util.List;

public class AnnouncementPostAdapter extends RecyclerView.Adapter<AnnouncementPostAdapter.AnnouncementPostHolder> {

    private List<PostModel> postList;

    public AnnouncementPostAdapter(List<PostModel> postList) {
        this.postList = postList;
    }

    @NonNull
    @Override
    public AnnouncementPostHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_post, parent, false);
        return new AnnouncementPostHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AnnouncementPostHolder holder, int position) {
        PostModel post = postList.get(position);
        Picasso.get()
                .load(post.getProfileImage())
                .placeholder(R.drawable.user)
                .error(R.drawable.user)
                .resize(200, 200)
                .centerCrop()
                .into(holder.rvUserProfile);
        holder.txtUserName.setText(post.getUserName());

        holder.rlImage.setVisibility(View.GONE);
        holder.rlVideo.setVisibility(View.GONE);

        if(post.getMediaType().equals("Video")){
            holder.rlVideo.setVisibility(View.VISIBLE);
            holder.rlImage.setVisibility(View.GONE);
            Picasso.get()
                    .load(post.getMedia())
                    .into(holder.ivMediaVideoThumbnail);
        }else if(post.getMediaType().equals("Image")){
            holder.rlVideo.setVisibility(View.GONE);
            holder.rlImage.setVisibility(View.VISIBLE);
            Picasso.get()
                    .load(post.getMedia())
                    .into(holder.ivMediaImage);
        }
        holder.txtTitle.setText(post.getPostTitle());
        holder.txtMessage.setText(post.getPostMessage());
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    public static class AnnouncementPostHolder extends RecyclerView.ViewHolder {
        ImageView rvUserProfile, ivMediaVideoThumbnail, ivMediaImage;
        RelativeLayout rlVideo, rlImage;
        TextView txtUserName, txtTitle, txtMessage;

        public AnnouncementPostHolder(@NonNull View itemView) {
            super(itemView);
            rvUserProfile = itemView.findViewById(R.id.rvUserProfile);
            ivMediaVideoThumbnail = itemView.findViewById(R.id.ivMediaVideoThumbnail);
            ivMediaImage = itemView.findViewById(R.id.ivMediaImage);

            rlVideo = itemView.findViewById(R.id.rlVideo);
            rlImage = itemView.findViewById(R.id.rlImage);

            txtUserName = itemView.findViewById(R.id.txtUserName);
            txtTitle = itemView.findViewById(R.id.txtTitle);
            txtMessage = itemView.findViewById(R.id.txtMessage);
        }
    }
}