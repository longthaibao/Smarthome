import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from "../../components/Header/Header.js";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminDetails: {
                fullname: '',
                email: '',
                password: ''
            },
            isEditing: false,
            newAdminDetails: {
                fullname: '',
                email: '',
                password: ''
            }
        };
    }

    componentDidMount() {
        this.fetchAdminDetails();
    }

    fetchAdminDetails = async () => {
        try {
            const adminId = await AsyncStorage.getItem('adminId'); // Retrieve adminId from AsyncStorage
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + `/admin/details/${adminId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch admin details');
            }
            const adminDetails = await response.json();
            this.setState({ adminDetails, adminId }); // Update state with adminId
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    }
    

    handleInputChange = (field, value) => {
        this.setState(prevState => ({
            newAdminDetails: {
                ...prevState.newAdminDetails,
                [field]: value
            }
        }));
    }

    handleEditButtonClick = () => {
        this.setState({ isEditing: true });
    }

    handleSaveButtonClick = async () => {
        try {
            const { adminId, newAdminDetails } = this.state;
            const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + `/admin/edit/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAdminDetails),
            });
            if (!response.ok) {
                throw new Error('Failed to update admin details');
            }
            this.setState({ isEditing: false });
            this.fetchAdminDetails();
        } catch (error) {
            console.error('Error updating admin details:', error);
        }
    }
    

    render() {
        const { adminDetails, isEditing, newAdminDetails } = this.state;

        return (
            <View style={styles.container}>
                <Header title="Profile" />
                <View style={styles.content}>
                    {isEditing ? (
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={newAdminDetails.fullname}
                                onChangeText={value => this.handleInputChange('fullname', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={newAdminDetails.email}
                                onChangeText={value => this.handleInputChange('email', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={newAdminDetails.password}
                                onChangeText={value => this.handleInputChange('password', value)}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity style={styles.button} onPress={this.handleSaveButtonClick}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.infoWrap}>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.text}>{adminDetails.fullname}</Text>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.text}>{adminDetails.email}</Text>
                            <Text style={styles.label}>Password:</Text>
                            <Text style={styles.text}>********</Text>
                            <TouchableOpacity style={styles.button} onPress={this.handleEditButtonClick}>
                                <Text style={styles.buttonText}>Edit profile</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <BottomSheetComponent active={4} />
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eff1f5',
    },
    content: {
        marginTop: 20,
        flexDirection: 'row',
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    formContainer: {
        padding: 20,
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    infoWrap: {
        padding: 5,
        paddingLeft: 20,
        flex: 1,
    },
    button: {
        backgroundColor: "rgba(152, 94, 225, 1)",
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
