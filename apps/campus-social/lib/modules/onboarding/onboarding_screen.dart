import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/modules/onboarding/login_screen.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, String>> _onboardingData = [
    {
      'title': 'Connect with Campus',
      'description': 'Stay updated with all campus activities, news and events in real-time.',
      'image': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    },
    {
      'title': 'Engage in Groups',
      'description': 'Join clubs, projects and interest groups to collaborate with your peers.',
      'image': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    },
    {
      'title': 'Academic Success',
      'description': 'Get quick access to your courses, results and academic support.',
      'image': 'https://images.unsplash.com/photo-1434030216411-0bb7538356e1?w=800',
    },
  ];

  @override
  Widget build(BuildContext context) {
    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.backgroundDark : Colors.white,
      body: Column(
        children: [
          Expanded(
            flex: 3,
            child: PageView.builder(
              controller: _pageController,
              onPageChanged: (value) => setState(() => _currentPage = value),
              itemCount: _onboardingData.length,
              itemBuilder: (context, index) => _OnboardingContent(
                title: _onboardingData[index]['title']!,
                description: _onboardingData[index]['description']!,
                image: _onboardingData[index]['image']!,
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _onboardingData.length,
                      (index) => _buildDot(index: index),
                    ),
                  ),
                  const Spacer(),
                  _buildGetStartedButton(),
                  const SizedBox(height: 20),
                  _buildLoginLink(),
                  const Spacer(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDot({required int index}) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      margin: const EdgeInsets.only(right: 8),
      height: 8,
      width: _currentPage == index ? 24 : 8,
      decoration: BoxDecoration(
        color: _currentPage == index ? AppTheme.primary : const Color(0xFFD8D8D8),
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }

  Widget _buildGetStartedButton() {
    return ElevatedButton(
      onPressed: () {
        if (_currentPage < _onboardingData.length - 1) {
          _pageController.nextPage(
            duration: const Duration(milliseconds: 300),
            curve: Curves.ease,
          );
        } else {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const LoginScreen()),
          );
        }
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: AppTheme.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 56),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        elevation: 0,
      ),
      child: Text(
        _currentPage == _onboardingData.length - 1 ? 'Get Started' : 'Next',
        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
      ),
    );
  }

  Widget _buildLoginLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Already have an account?', style: TextStyle(color: Colors.grey, fontSize: 13)),
        TextButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const LoginScreen()),
            );
          },
          child: Text(
            'Login',
            style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13),
          ),
        ),
      ],
    );
  }
}

class _OnboardingContent extends StatelessWidget {
  final String title, description, image;

  const _OnboardingContent({
    required this.title,
    required this.description,
    required this.image,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Spacer(),
        ClipRRect(
          borderRadius: BorderRadius.circular(32),
          child: Image.network(
            image,
            height: 300,
            width: double.infinity,
            fit: BoxFit.cover,
          ),
        ),
        const Spacer(),
        Text(
          title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w900,
            fontFamily: 'Public Sans',
            letterSpacing: -1,
          ),
        ),
        const SizedBox(height: 16),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          child: Text(
            description,
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.6),
          ),
        ),
      ],
    );
  }
}
