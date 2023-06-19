// LeetCode 1732. Find the Highest Altitude

// 아무리 easy라지만 정말 easy한 문제
class Solution {
  public int largestAltitude(int[] gain) {
    int altitude = 0;
    int highestAltitude = 0;

    for (int netGain: gain) {
      altitude += netGain;
      highestAltitude = Math.max(highestAltitude, altitude);
    }

    return highestAltitude;
  }
}
