package com.todistory.ui.activity.videochat;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.todistory.databinding.ActivityVideoChatBinding;
import com.todistory.model.VideoChatUserModel;
import com.todistory.ui.activity.MyFamilyTreeActivity;
import com.todistory.ui.adapter.VideoChatSelectionAdapter;

import java.util.ArrayList;
import java.util.List;

public class VideoChatActivity extends AppCompatActivity {
    ActivityVideoChatBinding binding;
    private VideoChatSelectionAdapter videoChatSelectionAdapter;
    private List<VideoChatUserModel> videoChatUserList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        binding = ActivityVideoChatBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        binding.imgClose.setOnClickListener(v -> {
            onBackPressed();
        });
        binding.rvCallSelection.setLayoutManager(new LinearLayoutManager(this));
        videoChatUserList = new ArrayList<>();
        videoChatUserList.add(new VideoChatUserModel("1", "Hearly", false));
        videoChatUserList.add(new VideoChatUserModel("2", "Tine", false));
        videoChatUserList.add(new VideoChatUserModel("3", "Sam", false));
        videoChatUserList.add(new VideoChatUserModel("4", "Amelia", false));
        videoChatUserList.add(new VideoChatUserModel("5", "Sophia", false));
        videoChatUserList.add(new VideoChatUserModel("6", "Julia", false));
        videoChatUserList.add(new VideoChatUserModel("7", "Ava", false));
        videoChatUserList.add(new VideoChatUserModel("8", "Henry", false));

        videoChatSelectionAdapter = new VideoChatSelectionAdapter(this,  videoChatUserList);
        binding.rvCallSelection.setAdapter(videoChatSelectionAdapter);

        binding.rlGroupCall.setOnClickListener(v -> {
            Intent intent = new Intent(VideoChatActivity.this, VideoCallActivity.class);
            startActivity(intent);
        });

    }
}