import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/modules/onboarding/onboarding_screen.dart';
import 'package:campus_social/modules/onboarding/login_screen.dart';
import 'package:campus_social/modules/onboarding/register_screen.dart';
import 'package:campus_social/modules/onboarding/onboarding_interests_screen.dart';
import 'package:campus_social/modules/feed/social_feed_home_screen.dart';
import 'package:campus_social/modules/feed/create_post_screen.dart';
import 'package:campus_social/modules/feed/post_detail_screen.dart';
import 'package:campus_social/modules/profile/student_profile_screen.dart';
import 'package:campus_social/modules/profile/settings_screen.dart';
import 'package:campus_social/modules/profile/account_settings_screen.dart';

import 'package:campus_social/modules/discovery/explore_screen.dart';
import 'package:campus_social/modules/academic/courses_overview_screen.dart';
import 'package:campus_social/modules/messages/messaging_list_screen.dart';
import 'package:campus_social/modules/messages/notifications_screen.dart';

import 'package:campus_social/modules/groups/groups_hub_screen.dart';
import 'package:campus_social/modules/groups/create_group_wizard.dart';

import 'package:campus_social/modules/coordinator/teacher_service_dashboard.dart';

void main() {
  runApp(const CampusSocialApp());
}

class CampusSocialApp extends StatelessWidget {
  const CampusSocialApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Campus Social',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      initialRoute: '/onboarding',
      routes: {
        '/onboarding': (context) => const OnboardingScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/interests': (context) => const OnboardingInterestsScreen(),
        '/home-feed': (context) => const SocialFeedHomeScreen(),
        '/explore': (context) => const ExploreScreen(),
        '/academic': (context) => const CoursesOverviewScreen(),
        '/groups': (context) => const GroupsHubScreen(),
        '/create-group': (context) => const CreateGroupWizardScreen(),
        '/teacher-dashboard': (context) => const TeacherServiceDashboardScreen(),
        '/messaging': (context) => const MessagingListScreen(),
        '/notifications': (context) => const NotificationsScreen(),
        '/create-post': (context) => const CreatePostScreen(),
        '/post-detail': (context) => const PostDetailScreen(),
        '/profile': (context) => const StudentProfileScreen(),
        '/settings': (context) => const SettingsScreen(),
        '/account-settings': (context) => const AccountSettingsScreen(),
      },
    );
  }
}
