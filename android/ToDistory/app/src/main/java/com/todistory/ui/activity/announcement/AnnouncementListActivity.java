package com.todistory.ui.activity.announcement;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import androidx.recyclerview.widget.LinearLayoutManager;

import com.todistory.databinding.ActivityAnnouncementListBinding;
import com.todistory.model.PostModel;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.adapter.AnnouncementPostAdapter;

import java.util.ArrayList;
import java.util.List;

public class AnnouncementListActivity extends BaseActivity {
    ActivityAnnouncementListBinding binding;
    private AnnouncementPostAdapter announcementPostAdapter;
    private List<PostModel> postList;
    String screenTitle = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        binding = ActivityAnnouncementListBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        Bundle bundle = getIntent().getExtras();
        screenTitle = bundle.getString("ScreenTitle");
        binding.txtScreenTitle.setText(screenTitle);
        binding.imgClose.setOnClickListener(v -> {
            onBackPressed();
        });
        binding.rvPost.setLayoutManager(new LinearLayoutManager(this));
        postList = new ArrayList<>();
        postList.add(new PostModel("1", "Dharmesh", "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", "Happy Birthday Harly!!", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", "Video"));
        postList.add(new PostModel("1", "Dharmesh", "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", "Happy Birthday Harly!!", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", "Image"));
        postList.add(new PostModel("1", "Dharmesh", "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", "Happy Birthday Harly!!", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", "Image"));
        postList.add(new PostModel("1", "Dharmesh", "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", "Happy Birthday Harly!!", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", "Image"));
        postList.add(new PostModel("1", "Dharmesh", "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", "Happy Birthday Harly!!", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", "Image"));
        postList.add(new PostModel("1", "Dharmesh", "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250", "Happy Birthday Harly!!", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", "Image"));


        announcementPostAdapter = new AnnouncementPostAdapter(postList);
        binding.rvPost.setAdapter(announcementPostAdapter);
    }
}