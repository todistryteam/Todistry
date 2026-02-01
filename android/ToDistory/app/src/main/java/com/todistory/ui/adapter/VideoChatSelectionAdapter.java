package com.todistory.ui.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.todistory.R;
import com.todistory.model.VideoChatUserModel;

import java.util.List;

public class VideoChatSelectionAdapter extends RecyclerView.Adapter<VideoChatSelectionAdapter.VideoChatSelectionHolder> {

    private List<VideoChatUserModel> videoChatUserList;
    Context context;

    public VideoChatSelectionAdapter(Context context, List<VideoChatUserModel> videoChatUserList) {
        this.context = context;
        this.videoChatUserList = videoChatUserList;
    }

    @NonNull
    @Override
    public VideoChatSelectionHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_call_selection, parent, false);
        return new VideoChatSelectionHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VideoChatSelectionHolder holder, @SuppressLint("RecyclerView") int position) {
        VideoChatUserModel videoChatUserModel = videoChatUserList.get(position);
        holder.txtUserName.setText(videoChatUserModel.getUserName());
        if (videoChatUserModel.isSelected()) {
            holder.ivCallRadio.setImageDrawable(context.getDrawable(R.drawable.call_selected));
        } else {
            holder.ivCallRadio.setImageDrawable(context.getDrawable(R.drawable.call_unselected));
        }
        holder.llCallSelection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(videoChatUserModel.isSelected()){
                    videoChatUserModel.setSelected(false);
                    holder.ivCallRadio.setImageDrawable(context.getDrawable(R.drawable.call_unselected));
                    notifyItemChanged(position);
                }else{
                    videoChatUserModel.setSelected(true);
                    holder.ivCallRadio.setImageDrawable(context.getDrawable(R.drawable.call_selected));
                    notifyItemChanged(position);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return videoChatUserList.size();
    }

    public static class VideoChatSelectionHolder extends RecyclerView.ViewHolder {
        LinearLayout llCallSelection;
        ImageView ivCallRadio;
        TextView txtUserName;

        public VideoChatSelectionHolder(@NonNull View itemView) {
            super(itemView);
            llCallSelection = itemView.findViewById(R.id.llCallSelection);
            ivCallRadio = itemView.findViewById(R.id.ivCallRadio);
            txtUserName = itemView.findViewById(R.id.txtUserName);
        }
    }
}