package com.todistory.common;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import com.todistory.R;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class Helper {
    public static SharedPreferences.Editor editor;
    public static SharedPreferences sha;
    public static ProgressDialog dialog;

    public static void showProgressDialog(Context context, String message) {
        if (context != null) {
            dialog = new ProgressDialog(context, R.style.MyPrpgressDialogStyle);
            dialog.setMessage(message);
            dialog.setCancelable(false);
            dialog.setCanceledOnTouchOutside(false);
            dialog.show();
        }

    }

    public static void dismissProgressDialog() {
        try {
            if (dialog != null && dialog.isShowing()) {
                dialog.dismiss();
                dialog = null;
            }
        } catch (final IllegalArgumentException e) {
            Log.e("Helper: ", "Exception: " + e.getMessage());
        } catch (final Exception e) {
            Log.e("Helper: ", "Exception: " + e.getMessage());
        } finally {
            dialog = null;
        }
    }

    @SuppressLint("CommitPrefEdits")
    public static void saveBooleanPreferenceData(Context context, String key, boolean value) {
        if (context != null) {
            editor = PreferenceManager.getDefaultSharedPreferences(context).edit();
            editor.putBoolean(key, value);
            editor.commit();
        }
    }

    public static boolean getBooleanPreferenceData(Context context, String key) {
        if (context != null) {
            sha = PreferenceManager.getDefaultSharedPreferences(context);
            return sha.getBoolean(key, false);
        } else {
            return true;
        }
    }

    @SuppressLint("CommitPrefEdits")
    public static void saveIntPreferenceData(Context context, String key, Integer value) {
        if (context != null) {
            editor = PreferenceManager.getDefaultSharedPreferences(context).edit();
            editor.putInt(key, value);
            editor.commit();
        }
    }

    @SuppressLint("CommitPrefEdits")
    public static void savePreferenceData(Context context, String key, String value) {
        if (context != null) {
            editor = PreferenceManager.getDefaultSharedPreferences(context).edit();
            editor.putString(key, value);
            editor.commit();
        }
    }


    public static boolean isNetworkAvailable(Context context) {
        if (context == null) return false;
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(connectivityManager.getActiveNetwork());
                if (capabilities != null) {
                    if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
                        return true;
                    } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
                        return true;
                    } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)) {
                        return true;
                    }
                }
            } else {
                try {
                    NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
                    if (activeNetworkInfo != null && activeNetworkInfo.isConnected()) {
                        Log.i("update_statut", "Network is available : true");
                        return true;
                    }
                } catch (Exception e) {
                    Log.i("update_statut", "" + e.getMessage());
                }
            }
        }
        return false;
    }

    public static String getPreferenceData(Context context, String key) {
        if (context != null) {
            sha = PreferenceManager.getDefaultSharedPreferences(context);
            return sha.getString(key, "");
        } else {
            return "";
        }
    }

    public static Integer getIntPreferenceData(Context context, String key) {
        if (context != null) {
            sha = PreferenceManager.getDefaultSharedPreferences(context);
            return sha.getInt(key, 0);
        } else {
            return 0;
        }
    }

    //method for check whether serice is running or not
    public static boolean isMyServiceRunning(Class<?> serviceClass, Context context) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }

    public static boolean isMediaMounted() {
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state)) {
            return true;
        } else if (Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
            // Read only isn't good enough
            return false;
        } else {
            return false;
        }
    }

    public static void clearPreferences(Context context) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = preferences.edit();
        editor.clear(); // Clear all stored data
        editor.apply(); // Apply changes (commit() can be used as well)
    }

    public static void hideKeyboard(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    public static String getCurrentDateTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        String formattedDate = sdf.format(new Date());
        return formattedDate;
    }

    public static String getBirthDate(String inputDate) {
        SimpleDateFormat inputFormat = new SimpleDateFormat("d-M-yyyy", Locale.getDefault());
        SimpleDateFormat outputFormat = new SimpleDateFormat("MM/dd/yyyy", Locale.getDefault());
        try {
            Date date = inputFormat.parse(inputDate);
            String formattedDate = outputFormat.format(date);
            Log.d("FormattedDate", formattedDate); // Output: 03/06/1995
            return formattedDate;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return "";
    }
}
