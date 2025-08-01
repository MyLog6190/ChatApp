package com.toy.chatapp.service;

import java.util.HashMap;

public interface MailService {
    void send(String to, HashMap<String, Object> params);
}
