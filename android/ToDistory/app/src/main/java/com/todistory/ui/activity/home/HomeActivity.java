package com.todistory.ui.activity.home;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;

import com.google.android.material.navigation.NavigationView;
import com.squareup.picasso.Picasso;
import com.todistory.R;
import com.todistory.common.Helper;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.activity.WelcomeActivity;
import com.todistory.ui.fragment.HomeFragment;
import com.todistory.ui.fragment.ProfileFragment;
import com.todistory.ui.fragment.SettingFragment;

public class HomeActivity extends BaseActivity {

    private DrawerLayout drawerLayout;

    @SuppressLint({"NonConstantResourceId", "SetTextI18n"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home2);
        drawerLayout = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.navigation_view);
        ImageView ivMenu = findViewById(R.id.ivMenu);
        ivMenu.setOnClickListener(view -> {
            if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
                drawerLayout.closeDrawer(GravityCompat.START);
            } else {
                drawerLayout.openDrawer(GravityCompat.START);
            }
        });
        View headerView = navigationView.getHeaderView(0);
        TextView txtName = headerView.findViewById(R.id.txtName);
        TextView txtEmail = headerView.findViewById(R.id.txtEmail);
        ImageView ivUserImage = headerView.findViewById(R.id.ivUserImage);
        txtName.setText(Helper.getPreferenceData(this, "AdminFirstName") + " " + Helper.getPreferenceData(this, "AdminLastName"));
        txtEmail.setText(Helper.getPreferenceData(this, "UserEmail"));
        if (!Helper.getPreferenceData(this, "UserImage").equals("")) {
            Picasso.get()
                    .load(Helper.getPreferenceData(this, "UserImage"))
                    .placeholder(R.drawable.user)
                    .error(R.drawable.user)
                    .resize(200, 200)
                    .centerCrop()
                    .into(ivUserImage);
        }
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawerLayout,
                R.string.navigation_drawer_open,
                R.string.navigation_drawer_close);

        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container, new HomeFragment())
                    .commit();
        }

        navigationView.setNavigationItemSelectedListener(item -> {
            Fragment fragment = null;
            switch (item.getItemId()) {
                case R.id.nav_home:
                    fragment = new HomeFragment();
                    break;
                case R.id.nav_profile:
                    fragment = new ProfileFragment();
                    break;
                case R.id.nav_tree:
                    break;
                case R.id.nav_support:
                    break;
                case R.id.nav_settings:
                    fragment = new SettingFragment();
                    break;
                case R.id.nav_logout:
                    drawerLayout.closeDrawer(GravityCompat.START);
                    new AlertDialog.Builder(this)
                            .setTitle(getString(R.string.alert))
                            .setMessage(getString(R.string.are_you_sure_you_want_to_logout))
                            .setPositiveButton(getString(R.string.yes), (dialog, which) -> {
                                Helper.clearPreferences(this);
                                Intent intent = new Intent(this, WelcomeActivity.class);
                                startActivity(intent);
                                finish();
                            })
                            .setNegativeButton(getString(R.string.no), null)
                            .show();
                    break;
            }

            if (fragment != null) {
                getSupportFragmentManager().beginTransaction()
                        .replace(R.id.container, fragment)
                        .commit();
            }

            drawerLayout.closeDrawer(GravityCompat.START);
            return true;
        });
    }
}