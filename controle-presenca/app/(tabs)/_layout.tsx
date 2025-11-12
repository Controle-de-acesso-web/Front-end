import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index"   options={{ title: 'Início' }} />
            <Tabs.Screen name="explore" options={{ title: 'Explorar' }} />
            {/* se não usar modal, pode excluir o arquivo */}
        </Tabs>
    );
}
