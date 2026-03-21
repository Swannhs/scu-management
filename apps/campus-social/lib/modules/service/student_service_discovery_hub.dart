
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class StudentServiceDiscoveryHubScreen extends StatelessWidget {

  const StudentServiceDiscoveryHubScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: SingleChildScrollView(

          child: Padding(

            padding: const EdgeInsets.all(24.0),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildHeader(isDark),

                const SizedBox(height: 32),

                const Text('ONBOARDING PORTAL', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),

                const SizedBox(height: 12),

                RichText(

                  text: TextSpan(

                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1, color: isDark ? Colors.white : Colors.black, height: 1.1),

                    children: [

                      const TextSpan(text: 'Ready to '),

                      TextSpan(text: 'Make\nan Impact', style: TextStyle(color: AppTheme.primary)),

                      const TextSpan(text: ',\nAlex?'),

                    ],

                  ),

                ),

                const SizedBox(height: 16),

                Text(

                  'Welcome to your student social service hub. Discover opportunities that match your major and passion for community growth.',

                  style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

                ),

                const SizedBox(height: 32),

                _buildSearchSection(isDark),

                const SizedBox(height: 48),

                _buildSectionHeader('For You', 'View all', 'Recommended based on your interest in Environment & Education', isDark),

                const SizedBox(height: 20),

                _buildFeaturedCard(isDark),

                const SizedBox(height: 16),

                _buildCommonCard('Library Tutoring', 'Assist first-year students with academic writing and research techniques.', 'OPEN', isDark),

                const SizedBox(height: 16),

                _buildGraphicCard(isDark),

                const SizedBox(height: 48),

                const Text('POPULAR TAGS', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),

                const SizedBox(height: 16),

                _buildTagsWrap(isDark),

                const SizedBox(height: 100),

              ],

            ),

          ),

        ),

      ),

      floatingActionButton: FloatingActionButton(

        onPressed: () {},

        backgroundColor: AppTheme.primary,

        child: const Icon(Icons.add, color: Colors.white),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Row(

          children: [

            Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle), child: const Icon(Icons.volunteer_activism, color: AppTheme.primary, size: 20)),

            const SizedBox(width: 12),

            const Text('EduServe', style: TextStyle(color: AppTheme.primary, fontSize: 18, fontWeight: FontWeight.w900)),

          ],

        ),

        const Icon(Icons.notifications_none, color: Colors.grey),

      ],

    );

  }

  Widget _buildSearchSection(bool isDark) {

    return Column(

      children: [

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 16),

          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey[200]!), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))]),

          child: const TextField(

            decoration: InputDecoration(

              hintText: 'Search by skill or project name',

              hintStyle: TextStyle(color: Colors.grey, fontSize: 14),

              icon: Icon(Icons.search, color: Colors.grey, size: 20),

              border: InputBorder.none,

            ),

          ),

        ),

        const SizedBox(height: 12),

        Row(

          children: [

            Expanded(

              flex: 1,

              child: Container(

                height: 48,

                decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(12)),

                child: Row(mainAxisAlignment: MainAxisAlignment.center, children: const [Icon(Icons.tune, size: 18), SizedBox(width: 8), Text('Filters', style: TextStyle(fontWeight: FontWeight.bold))]),

              ),

            ),

            const SizedBox(width: 12),

            Expanded(

              flex: 2,

              child: Container(

                height: 48,

                decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(12)),

                child: Center(child: Text('Find Impact', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),

              ),

            ),

          ],

        ),

      ],

    );

  }

  Widget _buildSectionHeader(String title, String link, String subText, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

            Text(link, style: const TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),

          ],

        ),

        const SizedBox(height: 4),

        Text(subText, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

      ],

    );

  }

  Widget _buildFeaturedCard(bool isDark) {

    return Container(

      height: 320,

      width: double.infinity,

      decoration: BoxDecoration(

        borderRadius: BorderRadius.circular(24),

        image: const DecorationImage(image: NetworkImage('https://images.unsplash.com/photo-1598901863558-8120ccb648bc?w=800'), fit: BoxFit.cover),

      ),

      child: Container(

        padding: const EdgeInsets.all(24),

        decoration: BoxDecoration(borderRadius: BorderRadius.circular(24), gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black.withOpacity(0.9)])),

        child: Column(

          mainAxisAlignment: MainAxisAlignment.end,

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Row(

              mainAxisAlignment: MainAxisAlignment.end,

              children: [

                Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Colors.red[900], borderRadius: BorderRadius.circular(4)), child: const Text('URGENT', style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold))),

              ],

            ),

            const Text('Campus Garden\nCleanup', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold, height: 1.1)),

            const SizedBox(height: 8),

            Text('Help restore the ecological balance of our university green spaces. Perfect for environmental science majors.', style: TextStyle(color: Colors.white70, fontSize: 12, height: 1.4)),

            const SizedBox(height: 20),

            Row(

              children: [

                ElevatedButton(

                  onPressed: () {},

                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primary, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)), padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12), elevation: 0),

                  child: const Text('Apply Now', style: TextStyle(fontWeight: FontWeight.bold)),

                ),

                const SizedBox(width: 16),

                Row(

                  children: const [

                    Icon(Icons.access_time, color: Colors.white70, size: 14),

                    SizedBox(width: 6),

                    Text('4 hours / week', style: TextStyle(color: Colors.white70, fontSize: 12)),

                  ],

                ),

              ],

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildCommonCard(String title, String desc, String status, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(24)),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)), child: const Icon(Icons.school, color: AppTheme.primary, size: 20)),

              Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(8)), child: Text(status, style: TextStyle(color: AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold))),

            ],

          ),

          const SizedBox(height: 16),

          Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

          const SizedBox(height: 4),

          Text(desc, style: TextStyle(color: Colors.grey[500], fontSize: 12, height: 1.4)),

        ],

      ),

    );

  }

  Widget _buildGraphicCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: Colors.grey[100]!), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))]),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: Colors.green[50]?.withOpacity(0.5), shape: BoxShape.circle), child: const Icon(Icons.edit, color: AppTheme.primary, size: 18)),

          const SizedBox(height: 12),

          const Text('Graphic Aid', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

          const SizedBox(height: 4),

          Text('Design social media posters for the local animal shelter.', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

          const SizedBox(height: 16),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('Details', style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),

              const Icon(Icons.arrow_forward_ios, color: Colors.grey, size: 14),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildTagsWrap(bool isDark) {

    final tags = ['Environment', 'Education', 'Healthcare', 'Tech Mentorship', 'Community Outreach', 'Sustainability'];

    return Wrap(

      spacing: 8,

      runSpacing: 8,

      children: tags.map((tag) => Container(

        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

        decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(20)),

        child: Text(tag, style: TextStyle(color: Colors.grey[700], fontSize: 12, fontWeight: FontWeight.w500)),

      )).toList(),

    );

  }

}
