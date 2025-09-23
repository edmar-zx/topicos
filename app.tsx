import React, { useEffect } from "react";
import { View, Button } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function App() {

    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Permissão para notificações negada!");
            }
        })();
    }, []);

    const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Notificação Profissional",
                body: "Essa é uma notificação de teste!",
                sound: true,
            },
            trigger: { seconds: 5 },
        });
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
            <Button title="Enviar Notificação" onPress={sendNotification} />
        </View>
    );
}