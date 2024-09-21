import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityId
  ) {
    return new Question(
      {
        ...props,
        createdAt: new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id
    );
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, "days") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat("...");
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
