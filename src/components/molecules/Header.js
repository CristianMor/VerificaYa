import { StyleSheet, View } from 'react-native';
import { TopNavigation } from '@ui-kitten/components';

const Header = () => {

  const renderTitle = (props) => {
    <View style={styles.titleContainer}>
      <Avatar 
        style={styles.logo}
      />
    </View>
  };

  return (
    <TopNavigation 
      title={renderTitle}
    />
  );
};

export default Header;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
