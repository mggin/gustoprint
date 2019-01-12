package com.gustoprint;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.telecom.Call;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import honeywell.connection.ConnectionBase;
import honeywell.connection.Connection_Bluetooth;
import honeywell.printer.DocumentDPL;
import honeywell.printer.ParametersDPL;

public class HoneyWellModule extends ReactContextBaseJavaModule {
    ConnectionBase conn;
    Bitmap imageData;
    DocumentDPL docDPL = new DocumentDPL();
    ParametersDPL paramDPL = new ParametersDPL();
    HashMap bitHashMap = new HashMap<>();
    byte[] printData = {0};
    private int m_printHeadWidth = 384;
    public HoneyWellModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "HoneyWell";
    }

    @ReactMethod
    public void printName(Callback cb) {
        cb.invoke("Hello World");
    }

    @ReactMethod
    public void getPairedDevices(Callback cb) {
        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();

       // WritableMap deviceObj = new WritableNativeMap();
        WritableArray deviceArray = new WritableNativeArray();


        if (pairedDevices.size() > 0) {
            // There are paired devices. Get the name and address of each paired device.
            for (BluetoothDevice device : pairedDevices) {
                WritableMap deviceObj = new WritableNativeMap();
                String deviceName = device.getName();
                String deviceHardwareAddress = device.getAddress(); // MAC address
                deviceObj.putString("name", deviceName);
                deviceObj.putString("address", deviceHardwareAddress);
                deviceArray.pushMap(deviceObj);

            }
            //cb.in
            cb.invoke(deviceArray);
        }

    }

    @ReactMethod
    public void connectToPrinter(String macAddress, Callback cb) throws Exception {
        try {
            conn = Connection_Bluetooth.createClient(macAddress, true);
        } catch(Exception e) {
            e.printStackTrace();
        }
        if (!conn.getIsOpen()) {
            conn.open();
            cb.invoke( conn.toString());
        }
    }

    @ReactMethod
    public  void decodeImage(String path, Integer index, Callback cb) throws IOException {
        //String path = Environment.getExternalStorageDirectory().getCanonicalPath();
        //String path = Environment.getExternalStorageDirectory().getAbsolutePath() + "/hello.jpg";
        bitHashMap.put(index, BitmapFactory.decodeFile(path));
        cb.invoke(path);
    }

    @ReactMethod
    public void printImage(Integer amount, Integer index, Callback cb) throws Exception {
        docDPL = new DocumentDPL();
        //BitmapFactory.Options option = BitmapFactory.
        //docDPL.writeImage(imageDataList.get(index), 200, 100, paramDPL);
        //String text = stringList.get(index);
        //docDPL.writeText("hello world", "00", 450, 100);
        docDPL.writeImage((Bitmap)bitHashMap.get(index), 0, 0,  paramDPL);
        printData = docDPL.getDocumentData();
        //docDPL.setPrintQuantity(amount);
        //conn.write(docDPL.getDocumentData())
        conn.write(printData);
        conn.close();

//        int bytesWritten = 0;
//        int bytesToWrite = 1024;
//        int totalBytes = printData.length;
//        int remainingBytes = totalBytes;
//        while (bytesWritten < totalBytes)
//        {
//            if (remainingBytes < bytesToWrite)
//                bytesToWrite = remainingBytes;
//
//            //Send data, 1024 bytes at a time until all data sent
//            conn.write(printData, bytesWritten, bytesToWrite);
//            bytesWritten += bytesToWrite;
//            remainingBytes = remainingBytes - bytesToWrite;
//            //Thread.sleep(100);
//        }

    }

    @ReactMethod
    public void cancelPrinting(Callback cb) {
        conn.clearWriteBuffer();
        cb.invoke(conn.read());
    }

    @ReactMethod
    public boolean isOpen() {
        return conn.getIsActive();
    }

    @ReactMethod
    public void closeConnection(Callback cb) {
        conn.close();
        cb.invoke("Connection is closed successfully");
    }

//    @ReactMethod
//    public void moveAssets(Callback cb) {
//        String path = Environment.getExternalStorageDirectory().toString();
//        String gustoFolder = "gustoprint";
//        File gusto = new File(path, gustoFolder);
//        if (!gusto.exists()) {
//            gusto.mkdirs();
//        }
//
//    }
}
