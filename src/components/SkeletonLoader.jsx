import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Skeleton
          radius={"round"}
          width={60}
          height={60}
          colors={["#d08770", "#ebcb8b"]}
        />
      </View>
      <View style={styles.content}>
        <Skeleton width="80%" height={15} colors={["#d08770", "#ebcb8b"]} />
        <Spacer />
        <Skeleton width="50%" height={15} colors={["#d08770", "#ebcb8b"]} />
      </View>
    </View>
  );
};

export const ListSkeleton = () => {
  return (
    <View style={styles.list}>
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});

export default SkeletonLoader;
