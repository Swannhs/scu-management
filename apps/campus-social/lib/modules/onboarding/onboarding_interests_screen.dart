
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class OnboardingInterestsScreen extends StatefulWidget {

  const OnboardingInterestsScreen({super.key});

  @override

  State<OnboardingInterestsScreen> createState() => _OnboardingInterestsScreenState();

}

class _OnboardingInterestsScreenState extends State<OnboardingInterestsScreen> {

  final List<String> _selectedInterests = ['Environment', 'Tech Mentorship'];

  final List<Map<String, dynamic>> _interests = [

    {'name': 'Environment', 'icon': Icons.forest, 'tasks': '128 Tasks'},

    {'name': 'Education', 'icon': Icons.school, 'tasks': '128 Tasks'},

    {'name': 'Healthcare', 'icon': Icons.health_and_safety, 'tasks': '45 Tasks'},

    {'name': 'Tech Mentorship', 'icon': Icons.code, 'tasks': 'Selected'},

    {'name': 'Community', 'icon': Icons.groups, 'tasks': '89 Tasks'},

    {'name': 'Sustainability', 'icon': Icons.eco, 'tasks': '67 Tasks'},

    {'name': 'Outreach', 'icon': Icons.diversity_1, 'tasks': '34 Tasks'},

    {'name': 'Animal Welfare', 'icon': Icons.pets, 'tasks': '22 Tasks'},

  ];

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FB),

      body: Stack(

        children: [

          // Background decorations

          Positioned(top: -100, right: -100, child: Container(width: 300, height: 300, decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.05), shape: BoxShape.circle))),

          Positioned(bottom: 200, left: -150, child: Container(width: 400, height: 400, decoration: BoxDecoration(color: Colors.blue.withOpacity(0.03), shape: BoxShape.circle))),

          

          SafeArea(

            child: SingleChildScrollView(

              padding: const EdgeInsets.symmetric(horizontal: 24),

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  const SizedBox(height: 48),

                  _buildRocketIcon(),

                  const SizedBox(height: 24),

                  _buildHeadline(),

                  const SizedBox(height: 12),

                  _buildSubheadline(),

                  const SizedBox(height: 48),

                  _buildInterestsGrid(isDark),

                  const SizedBox(height: 32),

                  _buildProgressDots(),

                  const SizedBox(height: 140), // Space for sticky footer

                ],

              ),

            ),

          ),

          _buildStickyFooter(context, isDark),

        ],

      ),

    );

  }

  Widget _buildRocketIcon() {

    return Container(

      width: 48,

      height: 48,

      decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.05), borderRadius: BorderRadius.circular(12)),

      child: const Icon(Icons.rocket_launch, color: AppTheme.primary, size: 24),

    );

  }

  Widget _buildHeadline() {

    return RichText(

      text: const TextSpan(

        style: TextStyle(fontSize: 40, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', color: Colors.black, letterSpacing: -1.0, height: 1.1),

        children: [

          TextSpan(text: 'Ready to Make an Impact, '),

          TextSpan(text: 'Alex?', style: TextStyle(color: AppTheme.primary)),

        ],

      ),

    );

  }

  Widget _buildSubheadline() {

    return const Text(

      'Select your core interests to discover volunteer opportunities tailored for you.',

      style: TextStyle(color: Colors.grey, fontSize: 18, height: 1.5),

    );

  }

  Widget _buildInterestsGrid(bool isDark) {

    return GridView.builder(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(

        crossAxisCount: 2,

        crossAxisSpacing: 16,

        mainAxisSpacing: 16,

        childAspectRatio: 0.9,

      ),

      itemCount: _interests.length,

      itemBuilder: (context, index) {

        final interest = _interests[index];

        bool isSelected = _selectedInterests.contains(interest['name']);

        

        return GestureDetector(

          onTap: () {

            setState(() {

              if (isSelected) {

                _selectedInterests.remove(interest['name']);

              } else {

                _selectedInterests.add(interest['name']!);

              }

            });

          },

          child: Container(

            padding: const EdgeInsets.all(20),

            decoration: BoxDecoration(

              color: isSelected ? AppTheme.primary.withOpacity(0.05) : (isDark ? Color(0xFF0F172A) : Colors.white),

              borderRadius: BorderRadius.circular(24),

              border: Border.all(

                color: isSelected ? AppTheme.primary : Colors.transparent,

                width: 2,

              ),

              boxShadow: [

                BoxShadow(

                  color: Colors.black.withOpacity(0.04),

                  blurRadius: 10,

                  offset: const Offset(0, 4),

                ),

              ],

            ),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Icon(

                  interest['icon'] as IconData,

                  color: isSelected ? AppTheme.primary : (isDark ? Colors.grey[400] : Color(0xFF334155)),

                  size: 32,

                ),

                const Spacer(),

                Text(

                  interest['name'] as String,

                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),

                ),

                const SizedBox(height: 4),

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Text(

                      isSelected ? 'SELECTED' : interest['tasks'] as String,

                      style: TextStyle(

                        color: isSelected ? AppTheme.primary : Colors.grey[500],

                        fontSize: 10,

                        fontWeight: FontWeight.w900,

                        letterSpacing: 1.0,

                      ),

                    ),

                    if (isSelected) const Icon(Icons.check_circle, color: AppTheme.primary, size: 16),

                  ],

                ),

              ],

            ),

          ),

        );

      },

    );

  }

  Widget _buildProgressDots() {

    return Row(

      mainAxisAlignment: MainAxisAlignment.center,

      children: [

        Container(width: 48, height: 6, decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(3))),

        const SizedBox(width: 8),

        Container(width: 8, height: 6, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(3))),

        const SizedBox(width: 8),

        Container(width: 8, height: 6, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(3))),

      ],

    );

  }

  Widget _buildStickyFooter(BuildContext context, bool isDark) {

    return Positioned(

      bottom: 0,

      left: 0,

      right: 0,

      child: Container(

        padding: const EdgeInsets.fromLTRB(24, 24, 24, 48),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.backgroundDark.withOpacity(0.9) : Colors.white.withOpacity(0.9),

          border: Border(top: BorderSide(color: Colors.grey.withOpacity(0.1))),

        ),

        child: Column(

          children: [

            Container(

              decoration: BoxDecoration(

                gradient: const LinearGradient(colors: [Color(0xFF006C46), Color(0xFF00A76F)]),

                borderRadius: BorderRadius.circular(16),

                boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4))],

              ),

              child: ElevatedButton(

                onPressed: () => Navigator.pop(context),

                style: ElevatedButton.styleFrom(

                  backgroundColor: Colors.transparent,

                  foregroundColor: Colors.white,

                  minimumSize: const Size(double.infinity, 64),

                  shape: const StadiumBorder(),

                  elevation: 0,

                ),

                child: Row(

                  mainAxisAlignment: MainAxisAlignment.center,

                  children: const [

                    Text('Find My Impact', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                    SizedBox(width: 12),

                    Icon(Icons.arrow_forward, size: 20),

                  ],

                ),

              ),

            ),

            const SizedBox(height: 12),

            const Text('Step 1 of 3: Personalized Interests', style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),

          ],

        ),

      ),

    );

  }

}
