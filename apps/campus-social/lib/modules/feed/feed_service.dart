import 'dart:async';
import 'package:campus_social/components/cards/social_post_card.dart';

class PostModel {
  final String id;
  final PostType type;
  final String authorName;
  final String authorRole;
  final String time;
  final String content;
  final List<String> imageUrls;
  final int likes;
  final int comments;
  final bool isOfficial;

  PostModel({
    required this.id,
    required this.type,
    required this.authorName,
    required this.authorRole,
    required this.time,
    required this.content,
    required this.imageUrls,
    required this.likes,
    required this.comments,
    this.isOfficial = false,
  });
}

class FeedService {
  static final List<PostModel> _mockPosts = [
    PostModel(
      id: '1',
      type: PostType.event,
      authorName: 'Campus Events Office',
      authorRole: 'Official Account',
      time: '5h ago',
      content: "Don't miss the Annual Spring Gala this Saturday at the Quad. Tickets are selling out fast! 🎟️",
      imageUrls: [],
      likes: 1240,
      comments: 84,
      isOfficial: true,
    ),
    PostModel(
      id: '2',
      type: PostType.singleImage,
      authorName: 'Elena Rodriguez',
      authorRole: 'Student',
      time: '2h ago',
      content: 'Incredible turn out for the solar engineering workshop today! Proud of the team for getting the prototype running before the deadline.',
      imageUrls: ['https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800'],
      likes: 342,
      comments: 18,
    ),
    PostModel(
      id: '3',
      type: PostType.text,
      authorName: 'Dr. Aris',
      authorRole: 'Professor',
      time: '1h ago',
      content: "Anyone else excited for the hackathon this weekend? I'm looking for a team with experience in Flutter and Node.js. #SCUHackathon",
      imageUrls: [],
      likes: 89,
      comments: 12,
      isOfficial: true,
    ),
    PostModel(
      id: '4',
      type: PostType.multiImage,
      authorName: 'Campus Life',
      authorRole: 'Club',
      time: '3h ago',
      content: 'Scenes from yesterday’s cultural fest! So much talent on display today.',
      imageUrls: [
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
      ],
      likes: 567,
      comments: 42,
    ),
  ];

  Future<List<PostModel>> getFeedPosts() async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 800));
    return _mockPosts;
  }

  Future<bool> likePost(String postId) async {
    await Future.delayed(const Duration(milliseconds: 300));
    return true;
  }
}
