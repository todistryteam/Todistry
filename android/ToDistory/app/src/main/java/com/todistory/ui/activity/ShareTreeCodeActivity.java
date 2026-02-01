package com.todistory.ui.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.todistory.R;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityShareTreeCodeBinding;

public class ShareTreeCodeActivity extends BaseActivity {

    ActivityShareTreeCodeBinding binding;
    String treeUrl = "", treeCode = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityShareTreeCodeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        if (getIntent().hasExtra("treeUrl")) {
            treeUrl = getIntent().getStringExtra("treeUrl");
        }
        if (getIntent().hasExtra("treeCode")) {
            treeCode = getIntent().getStringExtra("treeCode");
            binding.txtShareCode.setText(treeCode);
        }

        binding.rlNext.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                Helper.saveBooleanPreferenceData(ShareTreeCodeActivity.this, "isGetCode", true);
//                Intent intent = new Intent(ShareTreeCodeActivity.this, StartBuildTreeActivity.class);
//                startActivity(intent);

                Intent intent = new Intent(ShareTreeCodeActivity.this, PublishTreeActivity.class);
                intent.putExtra("treeUrl", treeUrl);
                startActivity(intent);
            }
        });

        binding.ivHome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Helper.clearPreferences(ShareTreeCodeActivity.this);
                Intent intent = new Intent(ShareTreeCodeActivity.this, WelcomeActivity.class);
                startActivity(intent);
                finish();
            }
        });

        binding.rlShare.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent shareIntent = new Intent(Intent.ACTION_SEND);
                shareIntent.setType("text/plain");
                shareIntent.putExtra(Intent.EXTRA_SUBJECT, "ToDistry");
                shareIntent.putExtra(Intent.EXTRA_TEXT, getString(R.string.to_view_the_family_tree_please_use_the_code)+" "+binding.txtShareCode.getText().toString());
                startActivity(Intent.createChooser(shareIntent, getString(R.string.share_via)));
            }
        });
    }
}