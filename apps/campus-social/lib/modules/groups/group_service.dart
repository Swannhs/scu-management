import 'dart:async';

class GroupModel {
  final String id;
  final String name;
  final String description;
  final String imageUrl;
  final int memberCount;
  final String category;
  final bool isPublic;

  GroupModel({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.memberCount,
    required this.category,
    this.isPublic = true,
  });
}

class GroupService {
  static final List<GroupModel> _mockGroups = [
    GroupModel(
      id: '1',
      name: 'Data Science Study',
      description: 'A place for data enthusiasts to share research and prepare for exams.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=400',
      memberCount: 450,
      category: 'Academic',
    ),
    GroupModel(
      id: '2',
      name: 'Chess Club',
      description: 'Weekly tournaments and strategy sessions for all skill levels.',
      imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400',
      memberCount: 215,
      category: 'Social',
    ),
    GroupModel(
      id: '3',
      name: 'Campus Podcast',
      description: 'Telling the stories of SCU student life, one episode at a time.',
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
      memberCount: 120,
      category: 'Clubs',
    ),
    GroupModel(
      id: '4',
      name: 'Morning Yoga Society',
      description: 'Start your day with mindfulness and movement at the Quad.',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      memberCount: 1200,
      category: 'Sports',
    ),
    GroupModel(
      id: '5',
      name: 'Tech Entrepreneurs',
      description: 'Building the next generation of campus startups.',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      memberCount: 850,
      category: 'Academic',
    ),
  ];

  Future<List<GroupModel>> getGroups() async {
    await Future.delayed(const Duration(milliseconds: 700));
    return _mockGroups;
  }

  Future<List<GroupModel>> getSuggestedGroups() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _mockGroups.sublist(3);
  }

  Future<bool> joinGroup(String groupId) async {
    await Future.delayed(const Duration(milliseconds: 400));
    return true;
  }
}

final groupService = GroupService();
