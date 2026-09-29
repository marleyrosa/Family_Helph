import { NextResponse } from 'next/server';
import { generateWeeklySummary, generateIndividualReport } from '../../../lib/ai-therapist';
import { AppStore } from '../../../lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body.type || 'weekly'; // 'weekly' | 'individual'

    const store = new AppStore();
    const today = new Date().toISOString().split('T')[0];
    const past7 = new Date();
    past7.setDate(past7.getDate() - 6);
    const startDate = past7.toISOString().split('T')[0];

    if (type === 'weekly') {
      const summary = await generateWeeklySummary(
        store.couple.coupleName,
        store.partner1,
        store.partner2,
        store.moodLogs.filter(m => m.userId === store.partner1.id),
        store.moodLogs.filter(m => m.userId === store.partner2.id),
        store.dailyAnswers.filter(a => a.userId === store.partner1.id),
        store.dailyAnswers.filter(a => a.userId === store.partner2.id),
        startDate,
        today
      );

      return NextResponse.json({ success: true, type: 'weekly', data: summary });
    } else {
      const userId = body.userId || store.partner1.id;
      const userObj = userId === store.partner1.id ? store.partner1 : store.partner2;
      const partnerObj = userId === store.partner1.id ? store.partner2 : store.partner1;

      const report = await generateIndividualReport(
        userObj,
        partnerObj,
        store.moodLogs.filter(m => m.userId === userId),
        store.dailyAnswers.filter(a => a.userId === userId),
        startDate,
        today
      );

      return NextResponse.json({ success: true, type: 'individual', data: report });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
