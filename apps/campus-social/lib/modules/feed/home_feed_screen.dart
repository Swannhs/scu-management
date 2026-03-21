
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/cards/story_item.dart';

import 'package:campus_social/components/cards/post_card.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class HomeFeedScreen extends StatelessWidget {

  const HomeFeedScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        title: Row(

          children: [

            Container(

              padding: const EdgeInsets.all(6),

              decoration: BoxDecoration(

                color: AppTheme.primary,

                borderRadius: BorderRadius.circular(8),

              ),

              child: const Icon(Icons.school, color: Colors.white, size: 20),

            ),

            const SizedBox(width: 8),

            Text(

              'Campus Social',

              style: TextStyle(

                fontWeight: FontWeight.bold,

                fontSize: 20,

                color: isDark ? Colors.white : Colors.black,

              ),

            ),

          ],

        ),

        actions: [

          IconButton(

            icon: const Icon(Icons.search),

            onPressed: () {},

          ),

        ],

      ),

      body: SingleChildScrollView(

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            // Stories Section

            SizedBox(

              height: 120,

              child: ListView(

                scrollDirection: Axis.horizontal,

                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

                children: [

                   const StoryItem(

                    name: 'My Story',

                    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBefUqr0E4yr5o7QLNxEiv0dVgXcs4vbF-11py92rH5-7fW6hc0IRWRRtNXlf5VByhFUBbfGYYqPxygbAomKX-eIKbO98G_K9lYIomWJksJ5vhPzr18pzC6tptNzQFEpE0ib6sDTG2zgqXInNtCv-q0HLaVdpIA_YHY6KUyM94hzbkz1o90mSfCtvPOmNC2gBfYbeJUUPSYKCjxL08BL2ZRmDIG9kDAciAJcgwCf1K40bHm_V4CABT60t4Ldtcsoh6t2xvZeiHFohit',

                    isCurrentUser: true,

                  ),

                  const StoryItem(name: 'Alex', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLWfQDVxLKogza0sAFdIWShW1u73Af5ivjz21B1mPLiedN-z-eBLNful69KVBkxBLL9vC7aakmyFVwdJhtN330sgy2ZpnU657QsFYMNV1xrwOet3zRqNKgWWzjmpJkCUl-uPZptSa04FuERtJeOXNojudj7QviP71wuKmS99-PjPJ0BthlTp9u8VMfIy-4Lg4bpvnupMIzjfizzyhHqokd7Av9tU1LyEAjVU2TdeUtjZXeSTBBXUAVGUM2jZCDfbg9rpeJN4mZv9HL'),

                  const StoryItem(name: 'Jordan', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIvkNb_BVoEg2oTS8zMbJU0xmTqe8p-pI2I04VnFHquVxkQTyMLMJzf9VeePcO_H-sxzGMG5idtereIgxf1YnxTGGYf0bGn7bXGnaXz5REPwLno9qjO7mrIpTSuWdiZcIGGjY7wxh_t6MPqidoEch9nM9_S4Rbcl79AVXF_dxn4k2VeTKHdyEhVLct4rWJ-BJcCCobt7T22GtWxPM0g6_RthLsTXe2KlbOA2EyvLcEklExbhLc4DZaN5IWhYPNklXxHM-w961RYnfJ'),

                  const StoryItem(name: 'Taylor', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHqcsqFCaspzUThNjVQ2FYqf8fYrd9sxYosDzyUjA6iSQIfKnao9x21A47dOu-LkNwonbUC3aqfBBKUy4HVrmCK43p_971qbFORCSdK2wWqKvvxe0re43G_o_UgerlrCQsad-7aw6mtRQkJjqUyFEt56lzkgg1vCfi8Y2zH_mS6fsykbnJg6xYDLnImICCUsOR1nFsNW3GAOLTKx8k7vF1TzNmAygt87b0mdwWBsfXzqpKVtibkKgOHwKjg21l-2cOyD8p5vAtS3LA'),

                  const StoryItem(name: 'Morgan', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJuYodgtDEejhWK2U0XCkQ0jAQ-3zgGZ9qmAoR2OokwrM9p4zIUQEoRprHevWTUDdlv2GJnuPyX11bZGku-bAEjkjjZaMuM8wInbEEoMrvJRnmxDt6sGzH6hPLF3UqXno6wTXJxUxlbCO9TSsmBPvQlIkWjmLaGrnA2TuL41PeAcE7-pAM5CwzOBwO9HtOlanJ114fnWN55aYkHV-7LPEtuWdpzuo1TFhyW6b4tQ1YzvMmdKakcePiqP9Mduy4j6C42uxUPzRlrd6N'),

                ],

              ),

            ),

            // Share Box

            Padding(

              padding: const EdgeInsets.all(16.0),

              child: Container(

                padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(

                  color: isDark ? const Color(0xFF1E293B) : Colors.white,

                  borderRadius: BorderRadius.circular(16),

                  boxShadow: [

                    BoxShadow(

                      color: AppTheme.primary.withOpacity(0.05),

                      blurRadius: 10,

                      offset: const Offset(0, 4),

                    ),

                  ],

                ),

                child: Column(

                  children: [

                    Row(

                      children: [

                        const CircleAvatar(

                          backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDUbtCoMmTt9gtQqKlinxpqNUrzpnAOaQwMXekJkkszlWuWjivytOxH76vLQxnWwq03SXjwj-NPRqqh9DW09oeoZjc6BFLVWnGKSwRWU8a-_IeHIEfB2MYOmm8SHgpHSFHf30UQDefJ1ZwQoG20rQsLz0e8U3ixfyVln6OlcF5ahG4s70_1dCx2129ZPcxBOSfI-fEW0CsiAxQd8paYPmWz0pUHfLTNyBpmYQz8rgZp31tbTZRcrJof5-l0cjnuGii90jPDX9smKfKF'),

                          radius: 20,

                        ),

                        const SizedBox(width: 12),

                        const Expanded(

                          child: TextField(

                            decoration: InputDecoration(

                              hintText: 'Share something with your campus...',

                              hintStyle: TextStyle(fontSize: 14),

                              border: InputBorder.none,

                            ),

                          ),

                        ),

                      ],

                    ),

                    const Divider(height: 24),

                    Row(

                      children: [

                        _ShareAction(icon: Icons.image, label: 'Photo', color: Colors.blue),

                        const SizedBox(width: 16),

                        _ShareAction(icon: Icons.videocam, label: 'Video', color: Colors.red),

                        const SizedBox(width: 16),

                        _ShareAction(icon: Icons.location_on, label: 'Check-in', color: AppTheme.primary),

                        const Spacer(),

                        ElevatedButton(

                          onPressed: () {},

                          style: ElevatedButton.styleFrom(

                            backgroundColor: AppTheme.primary,

                            foregroundColor: Colors.white,

                            shape: RoundedRectangleBorder(

                              borderRadius: BorderRadius.circular(20),

                            ),

                            elevation: 4,

                            shadowColor: AppTheme.primary.withOpacity(0.4),

                          ),

                          child: const Text('Post', style: TextStyle(fontWeight: FontWeight.bold)),

                        ),

                      ],

                    ),

                  ],

                ),

              ),

            ),

            // Feed Section

            Padding(

              padding: EdgeInsets.symmetric(horizontal: 16.0),

              child: Column(

                children: [

                  EventPostCard(

                    organizer: 'Casey Miller',

                    time: '2 hours ago',

                    category: 'Campus Events',

                    title: 'Excited for the upcoming Spring Festival!',

                    description: "Who's ready for the live music and food trucks? See you all at the main quad! #CampusLife #SpringFest",

                    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmBeEUsO45C56RrMyo5WWSyKWRMfjB1fmx1oKnyW7NJaVi-V13pu-U_ylJ48oRoS-p2-DNlUEoVv_inQOVJ0kAx1o-rjsfUXpKVKp9g9un2Pb2MaC1MAindnIv4NZ9NMkwhbCnam1WeZ7LxEnp6UBvdYs0RLCfQCmO0YKHKHGwyAFpQH7n5hz6A7WfmkejB8HbjrGeUVSyVAArsUtj09Dwet_L_BFj3gU4WA5IAkc2aB3-vDd_ply6KnEIRa2SverJ0K9kOPh84MOd',

                    attendingCount: 42,

                  ),

                  SizedBox(height: 16),

                  StandardPostCard(

                    author: 'Jamie Chen',

                    time: '45 minutes ago',

                    category: 'Study Groups',

                    content: "Found a great quiet spot in the old library for finals prep. There's coffee and plenty of outlets if anyone wants to join! 📚☕️",

                    likes: 128,

                    comments: 14,

                    shares: 3,

                  ),

                  SizedBox(height: 16),

                ],

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 0),

    );

  }

}

class _ShareAction extends StatelessWidget {

  final IconData icon;

  final String label;

  final Color color;

  const _ShareAction({

    required this.icon,

    required this.label,

    required this.color,

  });

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 20, color: Colors.grey[500]),

        const SizedBox(width: 4),

        Text(

          label,

          style: const TextStyle(

            fontSize: 12,

            fontWeight: FontWeight.w500,

            color: Colors.grey,

          ),

        ),

      ],

    );

  }

}
