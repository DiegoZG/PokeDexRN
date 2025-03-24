import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export interface Region {
  id: number;
  name: string;
  startId: number;
  endId: number;
}

const REGIONS: Region[] = [
  { id: 1, name: 'Kanto', startId: 1, endId: 151 },
  { id: 2, name: 'Johto', startId: 152, endId: 251 },
  { id: 3, name: 'Hoenn', startId: 252, endId: 386 },
  { id: 4, name: 'Sinnoh', startId: 387, endId: 493 },
  { id: 5, name: 'Unova', startId: 494, endId: 649 },
  { id: 6, name: 'Kalos', startId: 650, endId: 721 },
  { id: 7, name: 'Alola', startId: 722, endId: 809 },
  { id: 8, name: 'Galar', startId: 810, endId: 898 },
];

interface RegionDropdownProps {
  selectedRegion: Region;
  onRegionSelect: (region: Region) => void;
}

export function RegionDropdown({ selectedRegion, onRegionSelect }: RegionDropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="px-4 py-1">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-white rounded-full p-2 shadow-sm border border-gray-200 w-10 h-10 items-center justify-center"
        >
          <MaterialIcons name="filter-list" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
          <View className="flex-row justify-between items-center px-4 py-3 mt-8 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-900">Select Region</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-2"
            >
              <MaterialIcons name="close" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            {REGIONS.map((region) => (
              <TouchableOpacity
                key={region.id}
                className={`px-4 py-4 border-b border-gray-100 ${
                  selectedRegion.id === region.id ? 'bg-blue-50' : 'bg-white'
                }`}
                onPress={() => {
                  onRegionSelect(region);
                  setModalVisible(false);
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className={`text-lg font-medium ${
                      selectedRegion.id === region.id ? 'text-blue-600' : 'text-gray-800'
                    }`}>
                      {region.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      #{region.startId} - #{region.endId}
                    </Text>
                  </View>
                  {selectedRegion.id === region.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
} 