import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { canViewFullPalmReading, getPalmReadingEntitlement } from './access';
import type {
  PalmReading,
  PalmReadingHandSide,
  SelectedPalmImage,
} from './types';
import {
  usePalmReading,
  usePalmReadingHistory,
  usePalmReadingUpload,
} from './use-palm-reading';

import {
  AppButton,
  Badge,
  CelestialCard,
  CosmicScreen,
  EmptyStateCard,
  type IconName,
  InfoList,
  LoadingStateCard,
  SafeDisclaimerBlock,
  ScreenHeader,
  SectionHeader,
} from '@/components';
import { Phase3VisualBackground } from '@/components/phase3-backgrounds';
import { colors, radii, spacing, typography } from '@/theme';

const uploadTips = [
  {
    label: 'Lighting',
    value: 'Use clear, soft light with the full palm visible.',
    icon: 'sunny-outline' as const,
  },
  {
    label: 'Position',
    value: 'Keep one hand open, relaxed, and centered in the frame.',
    icon: 'hand-left-outline' as const,
  },
  {
    label: 'Clarity',
    value: 'Avoid blur, shadows, filters, and cropped fingers.',
    icon: 'images-outline' as const,
  },
];

function normalizeMimeType(asset: ImagePicker.ImagePickerAsset) {
  const mimeType = asset.mimeType?.toLowerCase();

  if (
    mimeType === 'image/jpeg' ||
    mimeType === 'image/png' ||
    mimeType === 'image/webp'
  ) {
    return mimeType;
  }

  const fileName = asset.fileName?.toLowerCase() ?? asset.uri.toLowerCase();

  if (fileName.endsWith('.png')) {
    return 'image/png';
  }

  if (fileName.endsWith('.webp')) {
    return 'image/webp';
  }

  return 'image/jpeg';
}

function selectedImageFromAsset(
  asset: ImagePicker.ImagePickerAsset,
): SelectedPalmImage {
  return {
    fileSize: asset.fileSize ?? null,
    height: asset.height || null,
    mimeType: normalizeMimeType(asset),
    uri: asset.uri,
    width: asset.width || null,
  };
}

function formatReadingDate(value?: string) {
  if (!value) {
    return 'Palm Reading';
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function handTitle(handSide: PalmReadingHandSide) {
  return handSide === 'left' ? 'Left hand' : 'Right hand';
}

function PalmImagePickerCard({
  disabled,
  handSide,
  image,
  onCapture,
  onPick,
}: {
  disabled: boolean;
  handSide: PalmReadingHandSide;
  image: SelectedPalmImage | null;
  onCapture: (handSide: PalmReadingHandSide) => void;
  onPick: (handSide: PalmReadingHandSide) => void;
}) {
  return (
    <CelestialCard
      eyebrow={image ? 'Ready' : 'Required'}
      icon={handSide === 'left' ? 'hand-left-outline' : 'hand-right-outline'}
      title={handTitle(handSide)}
    >
      {image ? (
        <Image
          accessibilityLabel={`${handTitle(handSide)} preview`}
          source={{ uri: image.uri }}
          style={styles.previewImage}
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            Add a clear {handSide} palm photo.
          </Text>
        </View>
      )}

      <View style={styles.actionRow}>
        <AppButton
          disabled={disabled}
          icon="camera-outline"
          label="Camera"
          onPress={() => onCapture(handSide)}
          variant="secondary"
        />
        <AppButton
          disabled={disabled}
          icon="images-outline"
          label="Library"
          onPress={() => onPick(handSide)}
          variant="secondary"
        />
      </View>
    </CelestialCard>
  );
}

function PalmHistoryList() {
  const { error, readings, reload, status } = usePalmReadingHistory();
  const completedReadings = readings.filter(
    (reading) =>
      reading.status === 'completed' ||
      reading.status === 'needs_better_images' ||
      reading.status === 'failed',
  );

  return (
    <View style={styles.stack}>
      <SectionHeader title="Recent palm readings" />

      {status === 'loading' || status === 'idle' ? (
        <LoadingStateCard
          body="Checking your saved symbolic palm readings."
          icon="bookmark-outline"
          title="Saved readings"
        />
      ) : null}

      {status === 'error' ? (
        <>
          <EmptyStateCard
            body={error ?? 'Saved Palm Readings could not be loaded.'}
            icon="alert-circle-outline"
            title="Palm history unavailable"
          />
          <AppButton label="Try again" onPress={reload} variant="secondary" />
        </>
      ) : null}

      {status === 'ready' && completedReadings.length === 0 ? (
        <EmptyStateCard
          body="Your completed palm readings will appear here."
          icon="albums-outline"
          title="No palm readings yet"
        />
      ) : null}

      {status === 'ready' && completedReadings.length > 0 ? (
        <View style={styles.stack}>
          {completedReadings.slice(0, 3).map((reading) => (
            <CelestialCard
              eyebrow={formatReadingDate(reading.created_at)}
              icon="hand-left-outline"
              key={reading.id}
              title={
                reading.status === 'completed'
                  ? (reading.summary ?? 'Symbolic palm reading')
                  : 'Palm Reading needs attention'
              }
            >
              <Text style={styles.body}>
                {reading.status === 'completed'
                  ? (reading.image_quality_note ??
                    'A saved symbolic reading is ready.')
                  : (reading.error_message ??
                    reading.image_quality_note ??
                    'Open this reading to continue.')}
              </Text>
              <AppButton
                href={`/palm-result?readingId=${reading.id}`}
                label="Open reading"
                style={styles.cardAction}
                variant="secondary"
              />
            </CelestialCard>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export function PalmIntroScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="cosmic" />}>
      <ScreenHeader
        body="A private, symbolic reflection from left and right palm photos."
        eyebrow="Palm reading"
        icon="hand-left-outline"
        title="Palm reading"
      />

      <InfoList items={uploadTips} />

      <CelestialCard
        eyebrow="Private upload"
        icon="shield-checkmark-outline"
        title="Your images stay private"
      >
        <Text style={styles.body}>
          Nova stores palm images in a private bucket and uses them only to
          create a gentle symbolic reading. Readings never make medical,
          fear-based, or guaranteed predictions.
        </Text>
        <AppButton
          href="/palm-upload"
          icon="cloud-upload-outline"
          label="Start reading"
          style={styles.cardAction}
        />
      </CelestialCard>

      <PalmHistoryList />
      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

export function PalmUploadScreen() {
  const router = useRouter();
  const [leftImage, setLeftImage] = useState<SelectedPalmImage | null>(null);
  const [rightImage, setRightImage] = useState<SelectedPalmImage | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const { error, status, submit } = usePalmReadingUpload();
  const isSubmitting = status === 'uploading';

  const updateImage = (
    handSide: PalmReadingHandSide,
    image: SelectedPalmImage,
  ) => {
    if (handSide === 'left') {
      setLeftImage(image);
      return;
    }

    setRightImage(image);
  };

  const pickImage = async (handSide: PalmReadingHandSide) => {
    setPermissionError(null);
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync(false);

    if (!permission.granted) {
      setPermissionError(
        'Photo library permission is needed to choose a palm image.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ['images'],
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]) {
      updateImage(handSide, selectedImageFromAsset(result.assets[0]));
    }
  };

  const captureImage = async (handSide: PalmReadingHandSide) => {
    setPermissionError(null);
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      setPermissionError(
        'Camera permission is needed to capture a palm image.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      cameraType: ImagePicker.CameraType.back,
      mediaTypes: ['images'],
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]) {
      updateImage(handSide, selectedImageFromAsset(result.assets[0]));
    }
  };

  const handleSubmit = async () => {
    const completedReading = await submit({ leftImage, rightImage });

    if (completedReading) {
      router.replace({
        pathname: '/palm-result',
        params: { readingId: completedReading.id },
      } as never);
    }
  };

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthPlace" />}>
      <ScreenHeader
        body="Upload or capture both palms for one symbolic reading."
        eyebrow="Palm photos"
        icon="cloud-upload-outline"
        title="Add palm photos"
      />

      <InfoList items={uploadTips} />

      {permissionError ? (
        <EmptyStateCard
          body={permissionError}
          icon="alert-circle-outline"
          title="Permission needed"
        />
      ) : null}

      {error ? (
        <EmptyStateCard
          body={error}
          icon="alert-circle-outline"
          title="Palm Reading is not ready"
        />
      ) : null}

      {isSubmitting ? (
        <LoadingStateCard
          body="Uploading your private palm images and creating a safe symbolic reading."
          icon="sparkles-outline"
          title="Creating your reading"
        />
      ) : null}

      <PalmImagePickerCard
        disabled={isSubmitting}
        handSide="left"
        image={leftImage}
        onCapture={(handSide) => {
          void captureImage(handSide);
        }}
        onPick={(handSide) => {
          void pickImage(handSide);
        }}
      />

      <PalmImagePickerCard
        disabled={isSubmitting}
        handSide="right"
        image={rightImage}
        onCapture={(handSide) => {
          void captureImage(handSide);
        }}
        onPick={(handSide) => {
          void pickImage(handSide);
        }}
      />

      <AppButton
        disabled={!leftImage || !rightImage || isSubmitting}
        icon="sparkles-outline"
        label={isSubmitting ? 'Creating reading' : 'Generate palm reading'}
        onPress={() => {
          void handleSubmit();
        }}
      />

      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

function fullReadingItems(reading: PalmReading) {
  const items: { label: string; value: string | null; icon: IconName }[] = [
    {
      label: 'Fate line',
      value: reading.fate_line,
      icon: 'trail-sign-outline',
    },
    { label: 'Mounts', value: reading.mounts, icon: 'planet-outline' },
    {
      label: 'Hand shape',
      value: reading.hand_shape,
      icon: 'hand-left-outline',
    },
    {
      label: 'Personality reflection',
      value: reading.personality_reflection,
      icon: 'sparkles-outline',
    },
    {
      label: 'Emotional style',
      value: reading.emotional_style,
      icon: 'heart-outline',
    },
    {
      label: 'Decision-making style',
      value: reading.decision_making_style,
      icon: 'git-branch-outline',
    },
    { label: 'Strengths', value: reading.strengths, icon: 'star-outline' },
    {
      label: 'Growth areas',
      value: reading.growth_areas,
      icon: 'leaf-outline',
    },
  ];

  return items.flatMap((item) =>
    item.value
      ? [{ label: item.label, value: item.value, icon: item.icon }]
      : [],
  );
}

function PalmReadingResult({ reading }: { reading: PalmReading }) {
  const entitlement = getPalmReadingEntitlement();
  const hasFullAccess = canViewFullPalmReading(entitlement);

  if (reading.status === 'needs_better_images') {
    return (
      <>
        <EmptyStateCard
          actionHref="/palm-upload"
          actionLabel="Upload clearer photos"
          body={
            reading.image_quality_note ??
            'Nova needs clearer left and right palm photos before creating a reading.'
          }
          icon="images-outline"
          title="Clearer photos needed"
        />
        <SafeDisclaimerBlock />
      </>
    );
  }

  if (reading.status === 'failed') {
    return (
      <>
        <EmptyStateCard
          body={
            reading.error_message ??
            'Palm Reading could not be generated. Please try again.'
          }
          icon="alert-circle-outline"
          title="Palm Reading is not ready"
        />
        <SafeDisclaimerBlock />
      </>
    );
  }

  if (reading.status !== 'completed') {
    return (
      <LoadingStateCard
        body="Nova is still creating this symbolic palm reading."
        icon="sparkles-outline"
        title="Reading in progress"
      />
    );
  }

  const previewItems = [
    {
      label: 'Heart line',
      value: reading.heart_line ?? 'Not clear enough to interpret.',
      icon: 'heart-outline' as const,
    },
    {
      label: 'Head line',
      value: reading.head_line ?? 'Not clear enough to interpret.',
      icon: 'bulb-outline' as const,
    },
    {
      label: 'Life line',
      value:
        reading.life_line ??
        'Not clear enough to interpret as an energy rhythm.',
      icon: 'pulse-outline' as const,
    },
  ];

  return (
    <>
      <CelestialCard
        eyebrow={formatReadingDate(reading.created_at)}
        icon="hand-left-outline"
        title="Your symbolic palm reading"
      >
        <Text style={styles.message}>{reading.summary}</Text>
        {reading.image_quality_note ? (
          <View style={styles.badgeRow}>
            <Badge icon="images-outline" tone="violet">
              {reading.image_quality_note}
            </Badge>
          </View>
        ) : null}
      </CelestialCard>

      <InfoList items={previewItems} />

      {hasFullAccess ? (
        <InfoList items={fullReadingItems(reading)} />
      ) : (
        <CelestialCard
          eyebrow="Nova Plus"
          icon="lock-closed-outline"
          title="Unlock the full palm reading"
        >
          <Text style={styles.body}>
            Go deeper into fate line, mounts, hand shape, emotional style,
            strengths, and growth areas with Nova Plus, Pro, or a full palm
            reading unlock.
          </Text>
          <AppButton
            href="/paywall"
            label="View upgrade options"
            style={styles.cardAction}
            variant="secondary"
          />
        </CelestialCard>
      )}

      <SafeDisclaimerBlock />
    </>
  );
}

export function PalmResultScreen() {
  const params = useLocalSearchParams<{ readingId?: string }>();
  const readingId = Array.isArray(params.readingId)
    ? params.readingId[0]
    : params.readingId;
  const { error, reading, reload, retryGeneration, status } =
    usePalmReading(readingId);

  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant="profileResult" />}
    >
      <ScreenHeader
        body="Symbolic palm guidance for reflection and entertainment."
        eyebrow="Palm result"
        icon="sparkles-outline"
        title="Palm result"
      />

      {status === 'loading' || status === 'idle' ? (
        <LoadingStateCard
          body="Opening your private Palm Reading."
          icon="moon-outline"
          title="Loading reading"
        />
      ) : null}

      {status === 'error' ? (
        <>
          <EmptyStateCard
            body={error ?? 'Palm Reading could not be loaded.'}
            icon="alert-circle-outline"
            title="Palm Reading unavailable"
          />
          <AppButton label="Try again" onPress={reload} variant="secondary" />
        </>
      ) : null}

      {status === 'ready' && !reading ? (
        <EmptyStateCard
          actionHref="/palm-upload"
          actionLabel="Start reading"
          body="Upload left and right palm photos to create your first symbolic reading."
          icon="hand-left-outline"
          title="No Palm Reading yet"
        />
      ) : null}

      {status === 'ready' && reading ? (
        <>
          <PalmReadingResult reading={reading} />
          {reading.status === 'failed' ? (
            <AppButton
              label="Retry Palm Reading"
              onPress={() => {
                void retryGeneration();
              }}
              variant="secondary"
            />
          ) : null}
        </>
      ) : null}
    </CosmicScreen>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  badgeRow: {
    alignItems: 'flex-start',
    marginTop: spacing.md,
  },
  body: {
    ...typography.body,
    color: colors.text.secondary,
  },
  cardAction: {
    marginTop: spacing.md,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
  },
  placeholderImage: {
    alignItems: 'center',
    aspectRatio: 1.32,
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.violet,
    borderRadius: radii.md,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  placeholderText: {
    ...typography.bodySmall,
    color: colors.text.muted,
    textAlign: 'center',
  },
  previewImage: {
    aspectRatio: 1.32,
    backgroundColor: colors.surface.base,
    borderColor: colors.border.card,
    borderRadius: radii.md,
    borderWidth: 1,
    width: '100%',
  },
  stack: {
    gap: spacing.md,
  },
});
