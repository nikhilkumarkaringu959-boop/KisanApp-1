import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Send, Sprout, Mic, Image as ImageIcon, Sparkles, Globe, ArrowLeft } from 'lucide-react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';

const quickPrompts = [
  'Telangana lo paddy MSP rate 2026?',
  'Hyderabad lo next 7 days weather',
  'Cotton ki best pesticide edhi?',
  'Rythu Bharosa eligibility check chey',
  'Tomato cultivation tips',
  'DAP fertilizer price today',
];

const SYSTEM_PROMPT = `You are KISAN AI, a smart farming assistant for Indian farmers in Telangana.
Answer in Telugu mixed with English. Be practical with specific numbers: kg/acre, rupees, dates.
Always use current 2026 data. For weather, prices, schemes - search web first.
Location: Hyderabad, Telangana, India. Keep answers short, actionable.`;

export default function KisanAI() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, text: 'Namaste! Nenu KISAN AI ni 🌾\nGroq AI + Internet tho connect ayyanu. Latest rates, weather, schemes, pest control - anni adagandi!', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const searchWeb = async (query) => {
    try {
      const res = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`);
      const result = res.data.Abstract || res.data.Answer || res.data.RelatedTopics?.[0]?.Text || '';
      return result.slice(0, 400);
    } catch {
      return '';
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      let webContext = '';
      if (currentInput.toLowerCase().match(/price|rate|weather|scheme|mandi|rain|temperature|msp|today|current|latest|ipudu/)) {
        webContext = await searchWeb(currentInput + ' Telangana India 2026');
      }

      const response = await axios.post(
        process.env.EXPO_PUBLIC_AI_API_URL,
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Web Context: ${webContext}\n\nFarmer Question: ${currentInput}` }
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      const aiText = response.data.choices[0].message.content;
      const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.log('AI Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Network issue mowa. Internet check chey leda API key sari chudu.');
      const errorMsg = { id: Date.now() + 1, text: 'Sorry mowa, connection problem. Malli try chey.', sender: 'ai' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios'? 'padding' : 'height'} keyboardVerticalOffset={90}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <View style={styles.aiIcon}>
            <Sprout color="#FFF" size={24} strokeWidth={2.5} />
          </View>
          <View>
            <Text style={styles.headerTitle}>KISAN AI</Text>
            <View style={styles.onlineRow}>
              <Globe color="#10B981" size={12} />
              <Text style={styles.headerSub}>Groq + Internet Live</Text>
            </View>
          </View>
        </View>
        <Sparkles color="#FDBA74" size={24} />
      </View>

      <ScrollView ref={scrollRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageRow, msg.sender === 'user' && styles.userRow]}>
            {msg.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Sprout color="#FFF" size={18} />
              </View>
            )}
            <View style={[styles.messageBubble, msg.sender === 'user'? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.messageText, msg.sender === 'user' && styles.userText]}>
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
        {loading && (
          <View style={styles.messageRow}>
            <View style={styles.aiAvatar}>
              <Sprout color="#FFF" size={18} />
            </View>
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <ActivityIndicator color="#2D6A4F" />
              <Text style={styles.typingText}>Internet nunchi latest data testunna...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {messages.length === 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickPrompts} contentContainerStyle={styles.quickPromptsContent}>
          {quickPrompts.map((prompt, index) => (
            <TouchableOpacity key={index} style={styles.promptChip} onPress={() => handleQuickPrompt(prompt)}>
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.attachBtn}>
          <ImageIcon color="#64748B" size={22} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ask anything... MSP, weather, pests..."
          placeholderTextColor="#94A3B8"
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
          editable={!loading}
        />
        <TouchableOpacity style={styles.micBtn}>
          <Mic color="#64748B" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}
        >
          {loading? <ActivityIndicator color="#FFF" size="small" /> : <Send color="#FFF" size={20} />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#1B4332', padding: 16, paddingTop: 60, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: { padding: 4 },
  headerLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2D6A4F', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  headerSub: { fontSize: 12, color: '#10B981', fontWeight: '600' },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 16, paddingBottom: 20 },
  messageRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
  userRow: { justifyContent: 'flex-end' },
  aiAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2D6A4F', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  messageBubble: { maxWidth: '75%', borderRadius: 18, padding: 14, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  aiBubble: { backgroundColor: '#FFF', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#2D6A4F', borderBottomRightRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 22, color: '#1E293B' },
  userText: { color: '#FFF' },
  typingText: { fontSize: 13, color: '#64748B', marginTop: 4, fontStyle: 'italic' },
  quickPrompts: { maxHeight: 50, marginBottom: 8 },
  quickPromptsContent: { paddingHorizontal: 16, gap: 8 },
  promptChip: { backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1.5, borderColor: '#E2E8F0' },
  promptText: { fontSize: 13, fontWeight: '600', color: '#2D6A4F' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', gap: 8 },
  attachBtn: { padding: 10 },
  input: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100, color: '#1E293B' },
  micBtn: { padding: 10 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2D6A4F', alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: '#CBD5E1' },
});
