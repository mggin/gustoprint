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
import java.util.List;
import java.util.Set;

import honeywell.connection.ConnectionBase;
import honeywell.connection.Connection_Bluetooth;
import honeywell.printer.DocumentDPL;
import honeywell.printer.ParametersDPL;

public class HoneyWellModule extends ReactContextBaseJavaModule {
    ConnectionBase conn;
    DocumentDPL docDPL = new DocumentDPL();
    ParametersDPL paramDPL = new ParametersDPL();
    List<Bitmap> imageDataList = new ArrayList<Bitmap>();
    List<String> stringList = new ArrayList<String>();
    Bitmap image;
    String text;
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
    public void print(String information, int amount) throws Exception {
//        if (conn.open()) {
//            docDPL.setPrintQuantity(amount);
//            docDPL.writeTextScalable(information, "00", 20, 20);
//            //docDPL.writeBarCode("a", "8900", 200, 200);
//            //docDPL.writeBarCodeGS1DataBar(ParametersDPL.GS1DataBar.UPCA, "12345678901", true, (byte) 2, (byte) 0, (byte) 0, (byte) 1);
//
//            //write normal ASCII Text Scalable
//
//            conn.write(docDPL.getDocumentData());
//
//        }
    }

    @ReactMethod
    public  void decodeImage(String path, Callback cb) throws IOException {
        // String path = Environment.getExternalStorageDirectory().getCanonicalPath();
//        String path = Environment.getExternalStorageDirectory().getAbsolutePath() + "/hello.jpg";

        //imageDataList.add(BitmapFactory.decodeFile(path));
        //stringList.add(path);
        //cb.invoke(stringList.toString());
        //image = BitmapFactory.decodeFile(path);
        text = path;
        cb.invoke(path);
    }

    @ReactMethod
    public void printImage(String path, Integer amount, Integer index, Callback cb) throws Exception {
        //BitmapFactory.Options options;
        //String path = Environment.getExternalStorageDirectory().getAbsolutePath() + '/' + menuName + ".jpeg";
        //options = new BitmapFactory.Options();
        //cb.invoke(path);
        //options.inSampleSize = 2;
        Bitmap imageData = BitmapFactory.decodeFile(path);
        //docDPL.writeImage(imageDataList.get(index), 200, 100, paramDPL);
        //String text = stringList.get(index);
        //docDPL.writeText("hello world", "00", 450, 100);
        docDPL.writeImage(imageData, 0, 0,  paramDPL);
        //docDPL.setPrintQuantity(amount);
        conn.write(docDPL.getDocumentData());
        //cb.invoke(text);
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
