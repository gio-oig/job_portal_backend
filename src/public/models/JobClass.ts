export class Job {
  constructor(
    public title: string,
    public description: string,
    public expiration_date: string,
    public creator_id: number,
    public location_id: number,
    public category_id: number
  ) {}
}
