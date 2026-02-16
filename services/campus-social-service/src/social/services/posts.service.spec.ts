import { Test } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OutboxService } from './outbox.service';

describe('PostsService', () => {
  const prisma = {
    post: { create: jest.fn() },
    comment: { create: jest.fn() },
    reaction: { upsert: jest.fn() },
    postMedia: { createMany: jest.fn() },
  } as any;
  const outbox = { publishEvent: jest.fn() };
  let service: PostsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PostsService, { provide: PrismaService, useValue: prisma }, { provide: OutboxService, useValue: outbox }],
    }).compile();
    service = module.get(PostsService);
    jest.clearAllMocks();
  });

  it('creates post, comment, react', async () => {
    prisma.post.create.mockResolvedValue({ id: 'p1', targetType: 'PROFILE', targetId: 'u1' });
    prisma.comment.create.mockResolvedValue({ id: 'c1' });
    prisma.reaction.upsert.mockResolvedValue({ id: 'r1', reactionType: 'LIKE' });

    await service.createPost('t1', 'u1', { targetType: 'PROFILE', targetId: 'u1', text: 'hello' } as any);
    await service.addComment('t1', 'p1', 'u1', { text: 'comment' } as any);
    const reaction = await service.reactToPost('t1', 'p1', 'u1', { reactionType: 'LIKE' } as any);

    expect(prisma.post.create).toHaveBeenCalled();
    expect(prisma.comment.create).toHaveBeenCalled();
    expect(reaction.id).toBe('r1');
  });
});
