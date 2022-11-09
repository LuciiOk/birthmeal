import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  StatusBar,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

import { COLORS } from "../constants/colorSchema";
import Text from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import InputDate from "../components/InputDate";
import { BirthdayContext } from "../contexts/BirthdayContext";
import {
  scheduleUserBirthday,
  cancelNotification,
} from "../hooks/useNotification";

import * as Notifications from "expo-notifications";
import { useForm, Controller } from "react-hook-form";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AddModal = ({ onClose, visible, dataEdit = null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: dataEdit?.name || "",
      birthdate: dataEdit?.birthdate || new Date(),
      remind: dataEdit?.notificationId ? true : false,
    },
  });
  const { addBirthday, loading, updateBirthday } = useContext(BirthdayContext);

  const onSubmit = async ({ name, birthdate, remind }) => {
    if (dataEdit) {
      const birthday = {
        id: dataEdit.id,
        name,
        birthdate: new Date(birthdate).toISOString(),
        remind,
        notificationId: (remind && dataEdit.notificationId) || null,
      };
      if (remind) {
        await cancelNotification(dataEdit.notificationId);
        birthday.notificationId = await scheduleUserBirthday(
          new Date(birthdate),
          name
        );
      }
      cancelNotification(dataEdit.notificationId);
      await updateBirthday({ ...birthday, notificationId: null });
    } else {
      const newBirthday = { name, birthdate, remind };
      if (remind) {
        const notificationId = await scheduleUserBirthday(birthdate, name);
        newBirthday.notificationId = notificationId;
      }
      await addBirthday(newBirthday);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text text="Agregar nuevo cumpleaños" bold subtitle />
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="close"
                size={25}
                color={COLORS.dark}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Input
              placeholder="Nombre"
              keyboardType="default"
              control={control}
              name="name"
              rules={{ required: true }}
            />
            {errors.name && (
              <Text text="El nombre es requerido" styles={styles.error} />
            )}
            <InputDate
              placeholder="Fecha de nacimiento"
              control={control}
              name="birthdate"
              rules={{ required: true }}
            />
            {errors.birthdate && (
              <Text text="La fecha es requerida" styles={styles.error} />
            )}
            <View style={styles.switchContainer}>
              <Text text="Desea recibir notificaciones?" />
              <Controller
                control={control}
                render={({ field }) => (
                  <Switch
                    trackColor={{ false: "#767577", true: COLORS.primary }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                )}
                name="remind"
                defaultValue={false}
              />
            </View>
            {!loading && (
              <Button
                buttonText="Agregar"
                action={handleSubmit(onSubmit)}
                outlined
              />
            )}
            {loading && (
              <LottieView
                source={require("../../assets/loties/loader.json")}
                autoPlay
                loop
                style={styles.animation}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    width: "90%",
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBody: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  animation: {
    width: 200,
  },
  error: {
    color: COLORS.danger,
    fontSize: 14,
    width: "100%",
  },
});

AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  dataEdit: PropTypes.object,
};

export default AddModal;
