import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase/client';
import { router } from 'expo-router';

const UserCard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch all users from the 'users' table
                const { data, error } = await supabase
                    .from('users')
                    .select('name, department, skills');

                if (error) {
                    throw error;
                }

                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.error}>Error: {error}</Text>;
    }

    const handleCardPress = (user) => {
        router.push({
            pathname: '/chatroom',
            params: {
                name: user.name,
                department: user.department,
                skills: user.skills,
                user : user,
            },
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {users.map((user, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleCardPress(user)}
                    activeOpacity={0.7} // Slight opacity change on press
                >
                    <View style={styles.card}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.department}>Department: {user.department}</Text>
                        <Text style={styles.skills}>Skills: {user.skills}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a202c',
    },
    department: {
        fontSize: 16,
        color: '#4a5568',
        marginTop: 8,
    },
    skills: {
        fontSize: 14,
        color: '#718096',
        marginTop: 8,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default UserCard;