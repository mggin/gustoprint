package com.gustoprint;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.telecom.Call;
import android.util.Log;

import com.facebook.react.bridge.Callback;
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
            cb.invoke("Connected");
        }
    }
}
