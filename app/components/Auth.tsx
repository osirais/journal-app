import { useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { useRouter } from "expo-router";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);
    if (error) return Alert.alert(error.message);
    router.replace("/(auth)/home");
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error
    } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View className="mt-10 px-3">
      <View className="mt-5 w-full py-1">
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View className="w-full py-1">
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View className="mt-5 w-full py-1">
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View className="w-full py-1">
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </View>
  );
}
