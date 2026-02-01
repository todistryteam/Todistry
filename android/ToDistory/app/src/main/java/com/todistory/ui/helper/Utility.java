package com.todistory.ui.helper;

import android.content.Context;
import android.graphics.Bitmap;
import android.text.TextUtils;
import android.util.Patterns;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class Utility {

    public static void showToastMessage(Context context, String message) {
        if (message == null || message.trim().isEmpty()) {
            message = "Something went wrong!";
        }
        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
    }

    public static String getGender(String gender) {
        if (gender.equals("Male")) {
            return "M";
        } else if (gender.equals("Female")) {
            return "F";
        } else if (gender.equals("Rather not say")) {
            return "O";
        } else {
            return "M";
        }
    }

    public static String getGenderName(String genderCode) {
        if (genderCode.equals("M")) {
            return "Male";
        } else if (genderCode.equals("F")) {
            return "Female";
        } else if (genderCode.equals("O")) {
            return "Rather not say";
        } else {
            return "M";
        }
    }

    public static byte[] getFileDataFromDrawable(Bitmap bitmap) {
        Bitmap resizeBitmap = getResizedBitmap(bitmap, 500);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        resizeBitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] imageInByte = byteArrayOutputStream.toByteArray();
        long lengthbmp = imageInByte.length;
        return byteArrayOutputStream.toByteArray();
    }

    public static Bitmap getResizedBitmap(Bitmap image, int maxSize) {
        int width = image.getWidth();
        int height = image.getHeight();
        float bitmapRatio = (float) width / (float) height;
        if (bitmapRatio > 1) {
            width = maxSize;
            height = (int) (width / bitmapRatio);
        } else {
            height = maxSize;
            width = (int) (height * bitmapRatio);
        }
        return Bitmap.createScaledBitmap(image, width, height, true);
    }

    public static byte[] getFileBytes(File file) throws IOException {
        FileInputStream fis = new FileInputStream(file);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int bytesRead;

        while ((bytesRead = fis.read(buffer)) != -1) {
            bos.write(buffer, 0, bytesRead);
        }

        fis.close();
        return bos.toByteArray();
    }

    public static boolean isIntegerIdOrNot(String id){
        try {
            Integer.parseInt(id);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static boolean isValidEmail(CharSequence target) {
        return (!TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches());
    }
}
