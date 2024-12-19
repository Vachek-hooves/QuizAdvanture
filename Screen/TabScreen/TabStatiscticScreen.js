import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';
import {quiz as QuizData} from '../../data/quiz';

const {width} = Dimensions.get('window');

const TabStatiscticScreen = () => {
  const {statistics = []} = useAppContext();

  const calculateTotalStats = () => {
    if (!statistics || statistics.length === 0) {
      return {
        totalCorrect: 0,
        avgPercentage: 0,
        totalTime: 0,
        gamesPlayed: 0,
        totalScore: 0,
      };
    }

    const totals = statistics.reduce(
      (acc, stat) => ({
        totalCorrect: acc.totalCorrect + stat.correctAnswers,
        totalPercentage: acc.totalPercentage + stat.percentage,
        totalTime: acc.totalTime + stat.timeSpent,
        gamesPlayed: acc.gamesPlayed + 1,
        totalScore: acc.totalScore + (stat.score || 0),
      }),
      {totalCorrect: 0, totalPercentage: 0, totalTime: 0, gamesPlayed: 0, totalScore: 0},
    );

    return {
      ...totals,
      avgPercentage: Math.round(totals.totalPercentage / totals.gamesPlayed),
    };
  };

  const getRegionStats = regionId => {
    if (!statistics || statistics.length === 0) return null;

    const regionStats = statistics.filter(
      stat => String(stat.quizId) === String(regionId),
    );
    if (regionStats.length === 0) return null;

    const bestScore = Math.max(...regionStats.map(s => s.correctAnswers));
    const bestPercentage = Math.max(...regionStats.map(s => s.percentage));
    const bestTime = Math.min(...regionStats.map(s => s.timeSpent));
    const attempts = regionStats.length;
    const lastPlayed = new Date(
      Math.max(...regionStats.map(s => new Date(s.timestamp))),
    );
    const highestScore = Math.max(...regionStats.map(s => s.score || 0));

    return {bestScore, bestPercentage, bestTime, attempts, lastPlayed, highestScore};
  };

  const {totalCorrect, avgPercentage, totalTime, gamesPlayed, totalScore} =
    calculateTotalStats();

  return (
    <ImageBackground
      source={require('../../assets/bg/bg.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.55)', 'rgba(20, 93, 160, 0.8)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {/* Overall Statistics */}
            <View style={styles.section}>
              <LinearGradient
                colors={['#2E8BC0', '#1A5F7A']}
                style={styles.card}>
                <Text style={styles.sectionTitle}>Overall Statistics</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{gamesPlayed}</Text>
                    <Text style={styles.statLabel}>Battles Fought</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{totalCorrect}</Text>
                    <Text style={styles.statLabel}>Total Correct</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{avgPercentage}%</Text>
                    <Text style={styles.statLabel}>Avg Success</Text>
                  </View>
                </View>
                <View style={[styles.statsRow, styles.marginTop]}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {Math.round(totalTime / gamesPlayed)}s
                    </Text>
                    <Text style={styles.statLabel}>Avg Time</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{totalScore}</Text>
                    <Text style={styles.statLabel}>Total Score</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Region Statistics */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Region Statistics</Text>
              {QuizData.map(region => {
                const stats = getRegionStats(region.id);
                if (!stats) return null;

                return (
                  <LinearGradient
                    key={region.id}
                    colors={[
                      'rgba(46, 139, 192, 0.3)',
                      'rgba(26, 95, 122, 0.3)',
                    ]}
                    style={styles.regionCard}>
                    <Text style={styles.regionTitle}>{region.name}</Text>
                    <View style={styles.statsRow}>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.attempts}</Text>
                        <Text style={styles.statLabel}>Attempts</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                          {stats.bestPercentage}%
                        </Text>
                        <Text style={styles.statLabel}>Best Score</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.bestTime}s</Text>
                        <Text style={styles.statLabel}>Best Time</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.highestScore}</Text>
                        <Text style={styles.statLabel}>Highest Score</Text>
                      </View>
                    </View>
                    <Text style={styles.lastPlayed}>
                      Last Played: {stats.lastPlayed.toLocaleDateString()}
                    </Text>
                  </LinearGradient>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={{height: 20}} />
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  card: {
    borderRadius: 15,
    // padding: 20,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  regionCard: {
    borderRadius: 15,
    // padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  regionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B4E0FF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  marginTop: {
    marginTop: 15,
  },
  lastPlayed: {
    fontSize: 12,
    color: '#B4E0FF',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default TabStatiscticScreen;
