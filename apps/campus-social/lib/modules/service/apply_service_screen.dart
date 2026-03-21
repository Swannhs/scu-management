
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ApplyServiceScreen extends StatelessWidget {

  const ApplyServiceScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Application', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(

            icon: const CircleAvatar(

              radius: 16,

              backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex'),

            ),

            onPressed: () {},

          ),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildServiceSummaryCard(isDark),

              const SizedBox(height: 32),

              _buildSectionTitle('Contact Information'),

              const SizedBox(height: 12),

              _buildLargeFormBox(

                isDark,

                [

                  _buildInputField('Full Name', 'John Doe', isDark),

                  const SizedBox(height: 16),

                  _buildInputField('Email Address', 'john.doe@scu.edu', isDark),

                ],

              ),

              const SizedBox(height: 32),

              _buildSectionTitle('Statement of Interest'),

              const SizedBox(height: 12),

              _buildLargeInputField('Why do you want to join this project?', 'Share your motivation...', isDark, isRequired: true, maxLines: 5),

              const SizedBox(height: 32),

              _buildSectionTitle('Previous Experience', isOptional: true),

              const SizedBox(height: 12),

              _buildLargeInputField('Previous Experience', 'Have you worked on similar projects?', isDark, maxLines: 3),

              const SizedBox(height: 32),

              _buildSectionTitle('Supporting Documents'),

              const SizedBox(height: 12),

              _buildUploadBox(isDark),

              const SizedBox(height: 32),

              _buildAgreementCheckbox(isDark),

              const SizedBox(height: 48),

              _buildSubmitButton(context, isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildSectionTitle(String title, {bool isOptional = false}) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey)),

        if (isOptional)

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),

            decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(4)),

            child: const Text('OPTIONAL', style: TextStyle(color: Colors.grey, fontSize: 8, fontWeight: FontWeight.bold)),

          ),

      ],

    );

  }

  Widget _buildServiceSummaryCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          ClipRRect(

            borderRadius: BorderRadius.circular(16),

            child: Image.network(r'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=200', width: 64, height: 64, fit: BoxFit.cover),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('City Park Restoration', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                const SizedBox(height: 4),

                Row(

                  children: [

                    const Icon(Icons.nature_people, size: 12, color: Colors.grey),

                    const SizedBox(width: 4),

                    Text('GreenEarth Org', style: TextStyle(color: Colors.grey[400], fontSize: 11)),

                    const SizedBox(width: 12),

                    const Icon(Icons.calendar_today, size: 10, color: AppTheme.primary),

                    const SizedBox(width: 4),

                    const Text('Oct 12, 9 AM', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildLargeFormBox(bool isDark, List<Widget> children) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(children: children),

    );

  }

  Widget _buildInputField(String label, String value, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          children: [

            Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

            const Text(' *', style: TextStyle(color: Colors.red, fontSize: 12)),

          ],

        ),

        const SizedBox(height: 8),

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),

          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),

          child: Text(value, style: const TextStyle(color: Colors.black87, fontSize: 14)),

        ),

      ],

    );

  }

  Widget _buildLargeInputField(String label, String hint, bool isDark, {bool isRequired = false, int maxLines = 1}) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          if (isRequired)

            Row(

              children: [

                Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

                const Text(' *', style: TextStyle(color: Colors.red, fontSize: 12)),

              ],

            ),

          const SizedBox(height: 8),

          TextField(

            maxLines: maxLines,

            decoration: InputDecoration(

              hintText: hint,

              hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),

              border: InputBorder.none,

            ),

          ),

          if (isRequired)

            Padding(

              padding: EdgeInsets.only(top: 8.0),

              child: Text('Minimum 50 words recommended', style: TextStyle(color: Colors.grey, fontSize: 10)),

            ),

        ],

      ),

    );

  }

  Widget _buildUploadBox(bool isDark) {

    return Container(

      width: double.infinity,

      height: 180,

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: Colors.grey[200]!, width: 1.5, style: BorderStyle.solid),

      ),

      child: Column(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

            child: const Icon(Icons.cloud_upload, color: AppTheme.primary),

          ),

          const SizedBox(height: 16),

          const Text('Upload ID or Certification', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

          const SizedBox(height: 4),

          Text('PDF, JPG, or PNG (Max 5MB)', style: TextStyle(color: Colors.grey[400], fontSize: 10)),

        ],

      ),

    );

  }

  Widget _buildAgreementCheckbox(bool isDark) {

    return Row(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Checkbox(value: false, onChanged: (v) {}, activeColor: AppTheme.primary),

        Expanded(

          child: Padding(

            padding: const EdgeInsets.only(top: 12.0),

            child: RichText(

              text: TextSpan(

                style: const TextStyle(fontSize: 12, color: Colors.grey, height: 1.5),

                children: [

                  const TextSpan(text: 'I agree to the '),

                  TextSpan(text: 'terms of service', style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

                  const TextSpan(text: ' and safety guidelines for this social project. '),

                  const TextSpan(text: '*', style: TextStyle(color: Colors.red)),

                ],

              ),

            ),

          ),

        ),

      ],

    );

  }

  Widget _buildSubmitButton(BuildContext context, bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () {

            Navigator.pushNamed(context, '/application-success');

          },

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

            elevation: 0,

          ),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.center,

            children: const [

              Text('Submit Application', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

              SizedBox(width: 12),

              Icon(Icons.send, size: 20),

            ],

          ),

        ),

        const SizedBox(height: 16),

        Text(

          'By submitting, you agree to our privacy policy regarding data collection.',

          textAlign: TextAlign.center,

          style: TextStyle(color: Colors.grey[400], fontSize: 10),

        ),

      ],

    );

  }

}
