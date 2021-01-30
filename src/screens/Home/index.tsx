import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Header from '@components/atoms/Header';
import Layout from '@components/atoms/Layout';
import { Colors, Mixins, Typography } from '@styles/index';
import Roulette from '@components/molecules/Roulette';
import Modal from '@components/atoms/Modal';
import Button from '@components/atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';

interface AppProps {}

interface AppState {
  items: string[];
  isRouletteSpinning: boolean;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BG_PRIMARY,
  },
  svContainer: {
    paddingBottom: Mixins.scaleSize(20),
  },
  welcomeText: {
    fontSize: Mixins.scaleFont(20),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.WHITE,
    alignSelf: 'center',
    ...Mixins.margin(Mixins.scaleSize(20), 0, 0, 0),
  },
  modalContainer: {
    backgroundColor: Colors.PRIMARY,
    maxHeight: 400,
    padding: Mixins.scaleSize(10),
  },
  addButton: {
    position: 'absolute',
    top: Mixins.scaleSize(10),
    left: 10,
    backgroundColor: Colors.PRIMARY,
    width: Mixins.scaleSize(80),
    height: Mixins.scaleSize(40),
  },
  addButtonTitle: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  infoButton: {
    position: 'absolute',
    bottom: Mixins.scaleSize(5),
    right: Mixins.scaleSize(20),
    backgroundColor: Colors.PRIMARY,
    width: Mixins.scaleSize(30),
    height: Mixins.scaleSize(30),
  },
  modalTitleText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.WHITE,
    fontSize: Mixins.scaleFont(20),
    textAlign: 'center',
  },
  modalContent: {
    paddingTop: Mixins.scaleSize(5),
    paddingBottom: Mixins.scaleSize(5),
  },
  modalContentText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: Mixins.scaleFont(18),
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    height: Mixins.scaleSize(40),
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
});

class Home extends React.Component<AppProps, AppState> {
  toggleModal: (() => void) | null;
  inputRef: React.MutableRefObject<string | null>;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      items: [
        'Pak Pong',
        'PizzaHut',
        'Paparons',
        'Domino',
        'Solaria',
        'Mas Kobis',
        'Olive',
        'Sabana',
      ],
      isRouletteSpinning: false,
    };
    this.toggleModal = null;
    this.inputRef = React.createRef<string | null>();
  }

  _addItem = () => {
    const { items } = this.state;
    if (this.inputRef.current && this.inputRef.current !== '') {
      const newItems = [...items, this.inputRef.current];
      this.setState({
        items: newItems,
      });
    }
  };

  _removeItem = () => {
    const { items } = this.state;
    const newItems = [...items];
    newItems.pop();
    this.setState({
      items: newItems,
    });
  };

  _showInfo = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        'App Icon: https://www.flaticon.com/',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  _renderModalContent = () => {
    const { items } = this.state;
    const isMaxItems = items.length === 9;
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitleText}>Roulette Items</Text>
        <ScrollView contentContainerStyle={styles.modalContent}>
          {items.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.modalContentText}>{item}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.modalFooter}>
          <TextInput
            editable={!isMaxItems}
            placeholder="items"
            onChangeText={(text) => (this.inputRef.current = text)}
          />
          <View style={styles.modalButtonContainer}>
            <Button
              disabled={isMaxItems}
              iconName="add-outline"
              iconColor={Colors.WHITE}
              onPress={this._addItem}
            />
            <Button
              iconName="remove-outline"
              iconColor={Colors.WHITE}
              onPress={this._removeItem}
            />
          </View>
        </View>
      </View>
    );
  };

  _toggleModal = () => {
    if (this.toggleModal) {
      this.toggleModal();
    }
  };

  _disableAdd = (spinning: boolean) => {
    this.setState({
      isRouletteSpinning: spinning,
    });
  };

  render() {
    const { items, isRouletteSpinning } = this.state;
    return (
      <Layout>
        <Modal
          dismissable={true}
          toggleModal={(callback) => {
            this.toggleModal = callback;
          }}>
          {this._renderModalContent()}
        </Modal>
        <ScrollView
          contentContainerStyle={styles.svContainer}
          showsVerticalScrollIndicator={false}>
          <Header title="Crazy Roulette" />
          <View style={styles.container}>
            <Button
              title="Add"
              iconName="add-outline"
              iconColor={Colors.WHITE}
              titleStyle={styles.addButtonTitle}
              disabled={isRouletteSpinning}
              customStyle={styles.addButton}
              onPress={this._toggleModal}
            />
            <Button
              iconName="help-outline"
              iconColor={Colors.WHITE}
              disabled={isRouletteSpinning}
              customStyle={styles.infoButton}
              onPress={this._showInfo}
            />
            <Text style={styles.welcomeText}>
              {isRouletteSpinning ? 'Spinning...' : 'Spin the roulette'}
            </Text>
            <Roulette isSpinning={this._disableAdd} itemList={items} />
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

export default Home;
