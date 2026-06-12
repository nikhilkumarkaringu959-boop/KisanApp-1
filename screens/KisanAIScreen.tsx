import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  KISAN_AI: undefined;
};

type KisanAIScreenNavigationProp = StackNavigationProp<RootStackParamList, 'KISAN_AI'>;

type Props = {
  navigation: KisanAIScreenNavigationProp;
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function KisanAIScreen({ navigation }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Namaste! I am KISAN AI 🌾\n\nThe Smart Farming Assistant. Ask me about crops, weather, fertilizers, or govt schemes!', sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState<string>('');

  const quickQuestions: string[] = [
    'Best fertilizer for paddy?',
    'Weather forecast tomorrow',
    'PM Kisan scheme details',
    'How to control pests?'
  ];

  const sendMessage = (text: string): void => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Mock AI Response - Real API tarvata add cheddam
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: `Great question about "${text}"! 🌱\n\nFor detailed guidance, please share:\n1. Your crop name\n2. Land size in acres\n3. Soil type\n\nI'll give exact recommendations with stage-wise dosage.`,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>KISAN AI</Text>
          <Text style={styles.headerSub}>The Smart Farming Assistant</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user'? styles.userMsg : styles.aiMsg]}>
            <Text style={[styles.messageText, msg.sender === 'user'? styles.userText : styles.aiText]}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.quickQuestions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickQuestions.map((q, i) => (
            <TouchableOpacity key={i} style={styles.quickBtn} onPress={() => sendMessage(q)}>
              <Text style={styles.quickBtnText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask about farming..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage(inputText)}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#16A34A' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 11, color: '#DCFCE7', marginTop: 2 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 16 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 12 },
  userMsg: { backgroundColor: '#16A34A', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  aiMsg: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4, elevation: 1 },
  messageText: { fontSize: 15, lineHeight: 21 },
  userText: { color: '#fff' },
  aiText: { color: '#1F2937' },
  quickQuestions: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: '#fff' },
  quickBtn: { backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginHorizontal: 4, marginLeft: 16 },
  quickBtnText: { fontSize: 13, color: '#374151', fontWeight: '600' },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100, fontSize: 15 },
  sendBtn: { backgroundColor: '#16A34A', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
});
