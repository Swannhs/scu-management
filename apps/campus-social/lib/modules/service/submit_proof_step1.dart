
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class SubmitProofStep1Screen extends StatelessWidget {

  const SubmitProofStep1Screen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Submit Proof', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.help_outline), onPressed: () {}),

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

              Text(

                'STEP 1 OF 2',

                style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1),

              ),

              const SizedBox(height: 8),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  const Text('Details', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),

                  _buildProgressBar(),

                ],

              ),

              const SizedBox(height: 32),

              _buildProjectCard(isDark),

              const SizedBox(height: 24),

              _buildLocationBadge(),

              const SizedBox(height: 40),

              _buildUploadSection(isDark),

              const SizedBox(height: 40),

              _buildReflectionSection(isDark),

              const SizedBox(height: 40),

              _buildActionButtons(context, isDark),

              const SizedBox(height: 40),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildProgressBar() {

    return Row(

      children: [

        Container(width: 32, height: 6, decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(3))),

        const SizedBox(width: 4),

        Container(width: 16, height: 6, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(3))),

      ],

    );

  }

  Widget _buildProjectCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border(left: BorderSide(color: AppTheme.primary, width: 4)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.05),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Row(

        children: [

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('CURRENT PROJECT', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold)),

                const SizedBox(height: 4),

                const Text('Campus Food Bank', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                const SizedBox(height: 8),

                Row(

                  children: [

                    Icon(Icons.calendar_today, size: 14, color: Colors.grey[500]),

                    const SizedBox(width: 8),

                    Text('Today, Oct 24', style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                  ],

                ),

              ],

            ),

          ),

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(12)),

            child: const Icon(Icons.volunteer_activism, color: AppTheme.primary),

          ),

        ],

      ),

    );

  }

  Widget _buildLocationBadge() {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      decoration: BoxDecoration(

        color: AppTheme.primary.withOpacity(0.1),

        borderRadius: BorderRadius.circular(20),

      ),

      child: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          const Icon(Icons.check_circle, color: AppTheme.primary, size: 16),

          const SizedBox(width: 8),

          const Text(

            'Location Verified at 14:30',

            style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold),

          ),

        ],

      ),

    );

  }

  Widget _buildUploadSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          children: [

            Icon(Icons.photo_camera, size: 20, color: Colors.grey[700]),

            const SizedBox(width: 8),

            const Text('Upload Photo Proof', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          ],

        ),

        const SizedBox(height: 16),

        Container(

          width: double.infinity,

          height: 200,

          decoration: BoxDecoration(

            color: isDark ? Color(0xFF0F172A)?.withOpacity(0.5) : Colors.grey[50],

            borderRadius: BorderRadius.circular(16),

            border: Border.all(color: Colors.grey[300]!, style: BorderStyle.none), // Custom dashed border would need a painter

          ),

          child: Column(

            mainAxisAlignment: MainAxisAlignment.center,

            children: [

              Container(

                padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle),

                child: const Icon(Icons.cloud_upload, color: AppTheme.primary, size: 32),

              ),

              const SizedBox(height: 16),

              const Text('Tap to capture or upload', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              const SizedBox(height: 4),

              Text('JPG, PNG up to 10MB', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildReflectionSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          children: [

            Icon(Icons.notes, size: 20, color: Colors.grey[700]),

            const SizedBox(width: 8),

            const Text('Reflection & Impact', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          ],

        ),

        const SizedBox(height: 16),

        Container(

          height: 160,

          padding: const EdgeInsets.all(16),

          decoration: BoxDecoration(

            color: isDark ? Color(0xFF0F172A)?.withOpacity(0.5) : Colors.grey[200]!.withOpacity(0.5),

            borderRadius: BorderRadius.circular(16),

          ),

          child: Column(

            children: [

              Expanded(

                child: TextField(

                  maxLines: null,

                  decoration: InputDecoration(

                    hintText: 'What did you learn today?',

                    hintStyle: TextStyle(color: Colors.grey[400]),

                    border: InputBorder.none,

                  ),

                ),

              ),

              Align(

                alignment: Alignment.bottomRight,

                child: Text('0/500', style: TextStyle(color: Colors.grey[400], fontSize: 12)),

              ),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () => Navigator.pushNamed(context, '/submit-proof-step2'),

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

            elevation: 0,

          ),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.center,

            children: const [

              Text('Next: Summary', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              SizedBox(width: 8),

              Icon(Icons.arrow_forward, size: 18),

            ],

          ),

        ),

        const SizedBox(height: 16),

        OutlinedButton(

          onPressed: () {},

          style: OutlinedButton.styleFrom(

            foregroundColor: AppTheme.primary,

            side: const BorderSide(color: AppTheme.primary),

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

          ),

          child: const Text('Save as Draft', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

      ],

    );

  }

}
