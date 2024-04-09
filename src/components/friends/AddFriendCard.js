import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const AddFriendCard = ({ img, name, onPress, status }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                {img ? ( //Checking if the img is available
                    <Image
                        alt=""
                        resizeMode="cover"
                        source={{ uri: img }}
                        style={styles.cardImg}
                    />
                ) : ( // If the img is not available, display the first letter of the name.
                    <View style={[styles.cardImg, styles.cardAvatar]}> 
                        <Text style={styles.cardAvatarText}>{name[0]}</Text>
                    </View>
                )}

                <View /*The part where name is displayed*/ style={styles.cardBody}> 
                    <Text style={styles.cardTitle}>{name}</Text>
                </View>

                                {
                status === 'NotFriend' ? (
                    <View style={styles.cardAction}> 
                        <FontAwesome6 //Add
                            name="add" 
                            size={24} 
                            color="black"
                        />
                    </View>
                ) : status === 'PendingInvite' ? (
                    <View style={styles.cardAction}> 
                        <MaterialIcons //Pending Invite
                            name="pending" 
                            size={24} 
                            color="black"
                        />
                    </View>
                ) : status === 'Friend' ? (
                    <View style={styles.cardAction}> 
                        <MaterialIcons //Remove
                            name="person-remove" 
                            size={24} 
                            color="black"
                        />
                    </View>
                ) : status === 'PendingReceive'(
                    <View style={styles.cardAction}> 
                        <AntDesign //Pending Receive
                            name="checkcircleo" 
                            size={24} 
                            color="black"
                        />
                    </View>
                )
                }
            </View>
        </TouchableOpacity>
    );
};

export default AddFriendCard;

const styles = StyleSheet.create({
    /** Card */
    card: {
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardWrapper: {
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    cardImg: {
        width: 42,
        height: 42,
        borderRadius: 12,
    },
    cardAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9ca1ac',
    },
    cardAvatarText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardBody: {
        marginRight: 'auto',
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    cardAction: {
        paddingRight: 16,
    },
});