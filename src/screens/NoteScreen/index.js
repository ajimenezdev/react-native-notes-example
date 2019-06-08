import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "react-native-firebase";
import { Transition } from "react-navigation-fluid-transitions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import {
  HR,
  CategoryPicker,
  ColorView,
  Text,
  TextInput
} from "ReactNativeNotas/src/components";
import Button from "ReactNativeNotas/src/components/Button";
import {
  addNote,
  updateNote,
  removeNote
} from "ReactNativeNotas/src/redux/notesReducer";
import withColors from "ReactNativeNotas/src/components/withColors";

const styles = StyleSheet.create({
  input: {
    width: "90%"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  note: {
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 100,
    maxHeight: "90%",
    width: "100%"
  },
  timestamp: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 15
  },
  categoryRow: {
    width: "100%",
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 10
  },
  content: {
    width: "100%",
    maxHeight: "80%"
  },
  contentBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

getDate = dateObj => (dateObj instanceof Date ? dateObj : dateObj.toDate());

class NoteScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  constructor(props) {
    super(props);

    this.state = {
      note: props.navigation.getParam("note"),
      modalVisible: false,
      dateTimeVisible: false
    };
  }

  toggleCategoryPicker = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleChangeCategory = category => {
    this.setState({ modalVisible: false });
    this.updateNoteState({ categoryId: category.id });
  };

  updateNoteState = property => {
    const newNote = { ...this.state.note, ...property };
    this.setState({ note: newNote });
  };

  createReminderNotification = () => {
    const { note } = this.state;
    const { id, title, text } = note;
    const notification = new firebase.notifications.Notification()
      .setNotificationId(`localReminder_${id}`)
      .setTitle(title)
      .setBody(text)
      .setData({
        id: id
      });

    const channel = new firebase.notifications.Android.Channel(
      "local-channel",
      "Local Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("localChannel");

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    notification.android.setChannelId("local-channel");
    const date = getDate(this.state.note.reminderDate);
    firebase.notifications().scheduleNotification(notification, {
      fireDate: date.getTime()
    });
  };

  saveNote = () => {
    const { note } = this.state;
    if (note.id) {
      this.props.updateNote(note);
    } else {
      const resp = this.props.addNote(note);
    }
    // comprobar si hay que añadir recordatorio
    if (
      note.reminderDate !== this.props.navigation.getParam("note").reminderDate
    ) {
      this.createReminderNotification();
    }
    this.props.navigation.goBack();
  };

  removeNote = () => {
    this.props.removeNote(this.state.note.id);
    this.props.navigation.goBack();
  };

  getCategory = categoryId =>
    this.props.categories.find(c => c.id === categoryId);

  toggleDateTimePicker = () => {
    this.setState({ dateTimeVisible: !this.state.dateTimeVisible });
  };

  setReminderDate = date => {
    this.updateNoteState({ reminderDate: date });
    this.toggleDateTimePicker();
  };

  render() {
    const { colors } = this.props;
    const basicStyles = getBasicStyles(colors);
    const { note, modalVisible, dateTimeVisible } = this.state;
    const { id, title, text, created, categoryId, reminderDate: reminder } =
      note || {};
    const category = this.getCategory(categoryId);
    const createdDate = created && getDate(created);
    const reminderDate = reminder && getDate(reminder);
    return (
      <View style={basicStyles.container}>
        <View style={[basicStyles.paper, styles.content]}>
          <Transition shared={`color${id}`}>
            <View
              style={[
                styles.contentBackground,
                {
                  backgroundColor:
                    (category && colors.categoryColors[category.colorIdx]) ||
                    colors.backgroundContent
                }
              ]}
            />
          </Transition>
          <View style={styles.timestamp}>
            {created && (
              <Text>
                {new Date(createdDate).toLocaleTimeString()} -{" "}
                {new Date(createdDate).toLocaleDateString()}
              </Text>
            )}
          </View>
          <Transition shared={`title${id}`}>
            <TextInput
              style={[styles.input, styles.title]}
              placeholder="Título"
              value={title}
              onChangeText={text => this.updateNoteState({ title: text })}
            />
          </Transition>
          <HR />
          <Transition shared={`text${id}`}>
            <TextInput
              style={[styles.input, styles.note]}
              placeholder="Nota"
              multiline={true}
              numberOfLines={4}
              value={text}
              onChangeText={text => this.updateNoteState({ text })}
            />
          </Transition>
        </View>
        <Transition appear="scale">
          <TouchableOpacity
            style={styles.categoryRow}
            onPress={this.toggleCategoryPicker}
          >
            {category && (
              <React.Fragment>
                <ColorView color={colors.categoryColors[category.colorIdx]} />
                <Text>{category.category}</Text>
              </React.Fragment>
            )}
            {!category && <Text>Elige categoría</Text>}
          </TouchableOpacity>
        </Transition>

        <Transition appear="scale">
          <TouchableOpacity
            style={styles.categoryRow}
            onPress={this.toggleDateTimePicker}
          >
            <Icon
              name="clock-outline"
              size={25}
              style={{ color: colors.text }}
            />
            {!reminderDate && <Text>Añadir recordatorio</Text>}
            {reminderDate && (
              <React.Fragment>
                <Text>
                  {new Date(reminderDate).toLocaleTimeString()} -{" "}
                  {new Date(reminderDate).toLocaleDateString()}
                </Text>
                <Button
                  danger
                  title="Borrar"
                  onPress={() => this.updateNoteState({ reminderDate: null })}
                />
              </React.Fragment>
            )}
          </TouchableOpacity>
        </Transition>
        <Transition appear="scale">
          <View style={[styles.buttonRow]}>
            {id && <Button danger title="Borrar" onPress={this.removeNote} />}
            <Button primary title="Guardar" onPress={this.saveNote} />
          </View>
        </Transition>
        <CategoryPicker
          visible={modalVisible}
          onChange={this.handleChangeCategory}
          onRequestClose={this.toggleCategoryPicker}
        />
        <DateTimePicker
          isVisible={dateTimeVisible}
          date={reminderDate || new Date()}
          minimumDate={new Date()}
          onConfirm={this.setReminderDate}
          onCancel={this.toggleDateTimePicker}
          mode="datetime"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addNote,
      updateNote,
      removeNote
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withColors(NoteScreen));
